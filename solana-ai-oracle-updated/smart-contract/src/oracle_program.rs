
// Solana AI Oracle Rust program
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    program_error::ProgramError,
    sysvar::clock::Clock,
};
use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct OracleData {
    pub values: Vec<String>,   // Submitted values
    pub timestamp: u64,        // Timestamp of the latest update
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum OracleInstruction {
    SubmitData { value: String },
    FinalizeConsensus,
}

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let oracle_account = next_account_info(accounts_iter)?;

    let mut oracle_data = OracleData::try_from_slice(&oracle_account.data.borrow())?;

    match OracleInstruction::try_from_slice(instruction_data)? {
        OracleInstruction::SubmitData { value } => {
            oracle_data.values.push(value);
            oracle_data.timestamp = Clock::get()?.unix_timestamp as u64;
            oracle_data.serialize(&mut *oracle_account.data.borrow_mut())?;
        }
        OracleInstruction::FinalizeConsensus => {
            let mut counts = std::collections::HashMap::new();
            for value in &oracle_data.values {
                *counts.entry(value.clone()).or_insert(0) += 1;
            }
            let consensus = counts.into_iter().max_by_key(|&(_, count)| count).map(|(value, _)| value);

            if let Some(result) = consensus {
                oracle_data.values = vec![result];
                oracle_data.serialize(&mut *oracle_account.data.borrow_mut())?;
            }
        }
    }

    Ok(())
}
