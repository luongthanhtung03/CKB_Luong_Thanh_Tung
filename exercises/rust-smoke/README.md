# Exercise — the smallest CKB Script in Rust

Week 1.5. Not a contract yet: a check that my Rust toolchain produces a binary
CKB-VM will run, before Week 4 needs it for real.

A CKB Script is a RISC-V program. Returning 0 means "allowed". With no OS under
it there is no `main`, no allocator and no `std` — so [`src/main.rs`](src/main.rs)
is one entry point making one syscall: `exit(0)`, syscall 93 (RFC 0009). No
`ckb-std`; that wraps all of this, and arrives in Week 4.

## Run it

```bash
rustup target add riscv64imac-unknown-none-elf   # once
cargo build --release                             # .cargo/config.toml sets the target
ckb-debugger --bin target/riscv64imac-unknown-none-elf/release/rust-smoke
```

```
Run result: 0
All cycles: 595
```

The binary is 952 bytes — `ELF 64-bit LSB executable, UCB RISC-V, RVC`.
Full run: [`evidence/week-01.5-rust-toolchain.log`](../../evidence/week-01.5-rust-toolchain.log).

## Windows note

No Visual Studio Build Tools here, so the host toolchain is `x86_64-pc-windows-gnu`,
which ships its own linker. The RISC-V target links with `rust-lld` either way, so
the host choice does not affect the Script.
