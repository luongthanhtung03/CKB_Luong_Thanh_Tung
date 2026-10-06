//! The smallest CKB Script I can write in Rust, with no ckb-std.
//!
//! A Script is a RISC-V program that CKB-VM runs; returning 0 means "this
//! transaction is allowed". There is no OS underneath, so there is no `main`,
//! no allocator and no std — just an entry point that makes one syscall.
//!
//! Week 1.5: the point is to prove the toolchain (rustup + the
//! riscv64imac-unknown-none-elf target) produces a binary CKB-VM accepts.
//! ckb-std, which wraps all of this, comes in Week 4.

#![no_std]
#![no_main]

use core::arch::asm;
use core::panic::PanicInfo;

/// CKB's `exit` syscall number (RFC 0009), the same as Linux's on RISC-V.
const SYS_EXIT: u64 = 93;

fn exit(code: i8) -> ! {
    unsafe {
        asm!("ecall", in("a0") code as u64, in("a7") SYS_EXIT, options(noreturn));
    }
}

#[unsafe(no_mangle)]
pub extern "C" fn _start() -> ! {
    exit(0)
}

#[panic_handler]
fn panic(_: &PanicInfo) -> ! {
    exit(-1)
}
