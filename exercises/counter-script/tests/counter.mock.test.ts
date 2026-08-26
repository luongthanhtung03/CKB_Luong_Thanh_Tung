/**
 * Tests for the counter Type Script.
 *
 * The point of these is not that the happy path works — that is the easy half.
 * A Type Script is only worth anything if it *rejects* things, so most of what
 * follows asserts failure, and asserts the specific error code, so a test
 * cannot pass because the script failed for some unrelated reason.
 *
 * These run against ckb-testtool, which executes the real script in the real
 * CKB-VM against a mocked transaction. No node required.
 */

import { hexFrom, Transaction, hashTypeToBytes, type Script } from '@ckb-ccc/core';
import { readFileSync } from 'fs';
import {
  Resource,
  Verifier,
  DEFAULT_SCRIPT_ALWAYS_SUCCESS,
  DEFAULT_SCRIPT_CKB_JS_VM,
} from 'ckb-testtool';

/** Error codes returned by contracts/counter/src/index.ts. */
const ERROR = {
  BAD_DATA_LENGTH: 10,
  CREATION_MUST_START_AT_ZERO: 11,
  MUST_INCREMENT_BY_ONE: 12,
  UNSUPPORTED_CELL_COUNT: 13,
  OVERFLOW: 14,
} as const;

/** A u64 as 8 little-endian bytes, which is what the script reads. */
function u64le(value: bigint): `0x${string}` {
  const buf = new ArrayBuffer(8);
  new DataView(buf).setBigUint64(0, value, true);
  return hexFrom(new Uint8Array(buf));
}

interface Scenario {
  /** counter values held by input Cells carrying this Type Script */
  inputs: `0x${string}`[];
  /** counter values held by output Cells carrying this Type Script */
  outputs: `0x${string}`[];
}

/**
 * Build a transaction in which `inputs.length` counter Cells are consumed and
 * `outputs.length` are created, then hand it to the verifier.
 */
function build({ inputs, outputs }: Scenario) {
  const resource = Resource.default();
  const tx = Transaction.default();

  // ckb-js-vm is the script that actually runs on chain; my compiled bytecode
  // is passed to it through its args.
  const jsVm = resource.deployCell(hexFrom(readFileSync(DEFAULT_SCRIPT_CKB_JS_VM)), tx, false);
  const lock = resource.deployCell(hexFrom(readFileSync(DEFAULT_SCRIPT_ALWAYS_SUCCESS)), tx, false);
  const counterCode = resource.deployCell(hexFrom(readFileSync('dist/counter.bc')), tx, false);

  jsVm.args = hexFrom(
    '0x0000' +
      counterCode.codeHash.slice(2) +
      hexFrom(hashTypeToBytes(counterCode.hashType)).slice(2) +
      '0000000000000000000000000000000000000000000000000000000000000000',
  );

  // The counter Cells. `jsVm` is their Type Script, so they all land in
  // SOURCE_GROUP_INPUT / SOURCE_GROUP_OUTPUT inside the script.
  for (const data of inputs) {
    const cell = resource.mockCell(lock, jsVm, data);
    tx.inputs.push(Resource.createCellInput(cell));
  }
  for (const data of outputs) {
    tx.outputs.push(Resource.createCellOutput(lock, jsVm));
    tx.outputsData.push(hexFrom(data));
  }

  // A transaction must have at least one input to be well formed. For the
  // creation case there is no counter to consume, so fund it with a plain Cell
  // that carries no Type Script — it is invisible to the group sources.
  if (inputs.length === 0) {
    const funding = resource.mockCell(lock, undefined as unknown as Script, '0x');
    tx.inputs.push(Resource.createCellInput(funding));
  }

  // The native ckb-debugger (installed by offckb) is used rather than the wasm
  // one — setWasmDebuggerEnabled(true) made every verification fail inside
  // ckb-testtool's own output parser, before my script logic was even reached.
  return Verifier.from(resource, tx);
}

describe('counter type script', () => {
  describe('creation — 0 inputs, 1 output', () => {
    test('accepts a new counter starting at 0', async () => {
      await build({ inputs: [], outputs: [u64le(0n)] }).verifySuccess(true);
    });

    test('rejects a new counter starting at 1', async () => {
      await build({ inputs: [], outputs: [u64le(1n)] }).verifyFailure(
        ERROR.CREATION_MUST_START_AT_ZERO,
      );
    });

    test('rejects a new counter starting at some large value', async () => {
      await build({ inputs: [], outputs: [u64le(9_999n)] }).verifyFailure(
        ERROR.CREATION_MUST_START_AT_ZERO,
      );
    });
  });

  describe('increment — 1 input, 1 output', () => {
    test('accepts 0 -> 1', async () => {
      await build({ inputs: [u64le(0n)], outputs: [u64le(1n)] }).verifySuccess(true);
    });

    test('accepts 41 -> 42', async () => {
      await build({ inputs: [u64le(41n)], outputs: [u64le(42n)] }).verifySuccess(true);
    });

    test('rejects standing still, 41 -> 41', async () => {
      await build({ inputs: [u64le(41n)], outputs: [u64le(41n)] }).verifyFailure(
        ERROR.MUST_INCREMENT_BY_ONE,
      );
    });

    test('rejects skipping ahead, 41 -> 43', async () => {
      await build({ inputs: [u64le(41n)], outputs: [u64le(43n)] }).verifyFailure(
        ERROR.MUST_INCREMENT_BY_ONE,
      );
    });

    test('rejects going backwards, 41 -> 40', async () => {
      await build({ inputs: [u64le(41n)], outputs: [u64le(40n)] }).verifyFailure(
        ERROR.MUST_INCREMENT_BY_ONE,
      );
    });

    test('rejects a jump to a huge value', async () => {
      await build({
        inputs: [u64le(41n)],
        outputs: [u64le(18_446_744_073_709_551_000n)],
      }).verifyFailure(ERROR.MUST_INCREMENT_BY_ONE);
    });
  });

  describe('overflow', () => {
    test('rejects incrementing a counter already at u64 max', async () => {
      const max = 2n ** 64n - 1n;
      // wrapping back to 0 is the failure this guards against
      await build({ inputs: [u64le(max)], outputs: [u64le(0n)] }).verifyFailure(
        ERROR.OVERFLOW,
      );
    });
  });

  describe('malformed data', () => {
    test('rejects a counter Cell holding 4 bytes instead of 8', async () => {
      await build({ inputs: [], outputs: ['0x00000000'] }).verifyFailure(
        ERROR.BAD_DATA_LENGTH,
      );
    });

    test('rejects a counter Cell holding no data at all', async () => {
      await build({ inputs: [], outputs: ['0x'] }).verifyFailure(ERROR.BAD_DATA_LENGTH);
    });

    test('rejects a counter Cell holding 16 bytes', async () => {
      await build({
        inputs: [],
        outputs: ['0x00000000000000000000000000000000'],
      }).verifyFailure(ERROR.BAD_DATA_LENGTH);
    });
  });

  describe('unsupported shapes', () => {
    test('rejects destroying a counter with no replacement', async () => {
      await build({ inputs: [u64le(7n)], outputs: [] }).verifyFailure(
        ERROR.UNSUPPORTED_CELL_COUNT,
      );
    });

    test('rejects merging two counters into one', async () => {
      await build({
        inputs: [u64le(3n), u64le(4n)],
        outputs: [u64le(8n)],
      }).verifyFailure(ERROR.UNSUPPORTED_CELL_COUNT);
    });

    test('rejects splitting one counter into two', async () => {
      await build({
        inputs: [u64le(3n)],
        outputs: [u64le(4n), u64le(0n)],
      }).verifyFailure(ERROR.UNSUPPORTED_CELL_COUNT);
    });

    test('rejects creating two counters at once', async () => {
      await build({
        inputs: [],
        outputs: [u64le(0n), u64le(0n)],
      }).verifyFailure(ERROR.UNSUPPORTED_CELL_COUNT);
    });
  });
});
