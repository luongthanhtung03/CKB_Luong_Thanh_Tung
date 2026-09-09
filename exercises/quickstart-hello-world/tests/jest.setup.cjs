/**
 * Make `npm test` find the native ckb-debugger on Windows.
 *
 * offckb installs the debugger binary into its own data directory and drops a
 * `ckb-debugger.cmd` shim next to the offckb binary. ckb-testtool spawns
 * `ckb-debugger` without a shell, and Windows will not resolve a bare name to a
 * `.cmd` shim that way, so every verification failed with
 *
 *   ckb-debugger not found. Please install it first: ...
 *
 * even though `offckb install ckb-debugger` had succeeded. Putting the directory
 * that holds the real executable on PATH fixes it for the whole test run.
 *
 * This is a no-op if the directory does not exist, so it does not get in the way
 * on a machine where ckb-debugger is already on PATH.
 *
 * This runs as jest `globalSetup`, not `setupFiles`. setupFiles executes inside
 * jest's per-file sandbox, and the PATH change there never reached the
 * child_process.spawnSync that ckb-testtool uses. globalSetup runs in the parent
 * process before the workers are forked, so the workers inherit the change.
 */

const { existsSync } = require('node:fs');
const { join, delimiter } = require('node:path');
const { homedir } = require('node:os');

/** Places offckb is known to keep its downloaded tool binaries. */
function candidateToolDirs() {
  const dirs = [];

  if (process.env.LOCALAPPDATA) {
    dirs.push(join(process.env.LOCALAPPDATA, 'offckb-nodejs', 'Data', 'tools'));
  }

  const home = homedir();
  dirs.push(
    // macOS
    join(home, 'Library', 'Application Support', 'offckb-nodejs', 'Data', 'tools'),
    // Linux / XDG
    join(process.env.XDG_DATA_HOME ?? join(home, '.local', 'share'), 'offckb-nodejs', 'Data', 'tools'),
  );

  return dirs;
}

const binaries = ['ckb-debugger.exe', 'ckb-debugger'];

module.exports = function addCkbDebuggerToPath() {
  for (const dir of candidateToolDirs()) {
    if (!binaries.some((bin) => existsSync(join(dir, bin)))) continue;

    const path = process.env.PATH ?? '';
    const alreadyPresent = path
      .split(delimiter)
      .some((entry) => entry.toLowerCase() === dir.toLowerCase());

    if (!alreadyPresent) {
      process.env.PATH = `${dir}${delimiter}${path}`;
    }
    return;
  }
};
