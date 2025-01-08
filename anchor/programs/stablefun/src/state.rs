use anchor_lang::prelude::*;

#[account] 
#[derive(InitSpace,Debug)]
pub struct MintConfig {
    pub signer: Pubkey,
    #[max_len(10)]
    pub target_fiat_currency: String,
    pub mint: Pubkey,
    #[max_len(20)]
    pub name: String,
    #[max_len(100)]
    pub icon: String,
    #[max_len(10)]
    pub symbol: String,
    pub mint_bump: u8,
    pub config_bump:u8
}

#[account]
#[derive(InitSpace, Debug)]
pub struct Collateral {
    pub signer: Pubkey,
    pub collateral_bond_token_account: Pubkey,
    pub stablecoin_token_account: Pubkey,
    pub stablebond_balance: u64,
    pub stablecoin_minted: u64,
    pub collateral_bump:u8,
    pub is_initialized: bool
}


