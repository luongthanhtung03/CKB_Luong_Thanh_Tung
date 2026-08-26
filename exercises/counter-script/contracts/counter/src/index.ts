/**
 * Counter — a CKB Type Script.
 *
 * The rule, in one sentence: a counter Cell holds a little-endian u64, it may
 * only be created with the value 0, and it may only be updated by incrementing
 * it by exactly one.
 *
 * I wrote this to make the validation model concrete for myself. A Type Script
 * does not compute the next value. It is handed a finished transaction that
 * somebody else assembled off-chain, and its only job is to say yes or no. So
 * the whole script below is a question — "is this transition legal?" — and never
 * an instruction.
 *
 * Three transitions are possible, and the script has to distinguish them by
 * counting how many counter Cells are in the inputs and the outputs:
 *
 *   0 in, 1 out  -> creation.  the new counter must start at 0
 *   1 in,  1 out -> increment. out must be exactly in + 1
 *   anything else -> reject
 *
 * SOURCE_GROUP_INPUT and SOURCE_GROUP_OUTPUT are what make this readable: they
 * iterate only the Cells in this transaction that carry *this same Type Script*,
 * so the script never has to filter other people's Cells out by hand.
 */

import * as bindings from '@ckb-js-std/bindings';
import { HighLevel, log } from '@ckb-js-std/core';

/** A u64 counter, little-endian, is exactly 8 bytes. */
const COUNTER_BYTES = 8;

/** Largest value a u64 can hold, so an increment cannot silently wrap to 0. */
const U64_MAX = 2n ** 64n - 1n;

/** Exit codes. 0 is success; anything else fails the transaction. */
const enum Error {
  Ok = 0,
  BadDataLength = 10,
  CreationMustStartAtZero = 11,
  MustIncrementByOne = 12,
  UnsupportedCellCount = 13,
  Overflow = 14,
}

/**
 * Read one counter Cell's data as a u64.
 *
 * The length check matters more than it looks. Cell data is arbitrary bytes, so
 * without this a Cell carrying 4 bytes, or 800, would be read as a counter and
 * the comparison below would be meaningless.
 */
function readCounter(index: number, source: bindings.SourceType): bigint | null {
  const data = HighLevel.loadCellData(index, source);
  if (data.byteLength !== COUNTER_BYTES) {
    log.error(
      `counter cell has ${data.byteLength} bytes of data, expected ${COUNTER_BYTES}`,
    );
    return null;
  }
  // true = little-endian, which is the CKB convention for numbers in cell data.
  return new DataView(data).getBigUint64(0, true);
}

/** Every Cell in this transaction carrying this same Type Script, from one side. */
function readCounters(source: bindings.SourceType): bigint[] | null {
  const values: bigint[] = [];
  for (let index = 0; ; index += 1) {
    let data: ArrayBuffer;
    try {
      data = HighLevel.loadCellData(index, source);
    } catch {
      // QueryIter would hide this, but I want it explicit: the loop ends when
      // the VM reports there is no Cell at this index, not at a length we knew
      // in advance.
      break;
    }
    if (data.byteLength !== COUNTER_BYTES) {
      log.error(`cell at index ${index} has ${data.byteLength} bytes, expected ${COUNTER_BYTES}`);
      return null;
    }
    values.push(new DataView(data).getBigUint64(0, true));
  }
  return values;
}

function main(): number {
  log.setLevel(log.LogLevel.Debug);

  const inputs = readCounters(bindings.SOURCE_GROUP_INPUT);
  if (inputs === null) return Error.BadDataLength;

  const outputs = readCounters(bindings.SOURCE_GROUP_OUTPUT);
  if (outputs === null) return Error.BadDataLength;

  log.debug(`counter: ${inputs.length} input(s) -> ${outputs.length} output(s)`);

  // --- creation ----------------------------------------------------------
  if (inputs.length === 0 && outputs.length === 1) {
    const start = outputs[0]!;
    if (start !== 0n) {
      log.error(`a new counter must start at 0, got ${start}`);
      return Error.CreationMustStartAtZero;
    }
    log.debug('counter created at 0');
    return Error.Ok;
  }

  // --- increment ---------------------------------------------------------
  if (inputs.length === 1 && outputs.length === 1) {
    const before = inputs[0]!;
    const after = outputs[0]!;

    if (before === U64_MAX) {
      log.error('counter is at u64 max and cannot be incremented');
      return Error.Overflow;
    }

    if (after !== before + 1n) {
      log.error(`counter must go ${before} -> ${before + 1n}, but output is ${after}`);
      return Error.MustIncrementByOne;
    }

    log.debug(`counter incremented ${before} -> ${after}`);
    return Error.Ok;
  }

  // --- everything else ---------------------------------------------------
  // Deliberately strict. Merging two counters, splitting one into two, or
  // destroying one without a replacement are all rejected, because none of
  // them have an obvious correct answer and a Type Script should not guess.
  log.error(
    `unsupported counter cell count: ${inputs.length} input(s), ${outputs.length} output(s)`,
  );
  return Error.UnsupportedCellCount;
}

bindings.exit(main());
