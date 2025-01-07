#!/bin/bash
cargo build-bpf --manifest-path=../smart-contract/Cargo.toml --bpf-out-dir=../target/deploy
solana program deploy ../target/deploy/solana_ai_oracle.so
