use anchor_lang::prelude::*;

declare_id!("6z68wfurCMYkZG51s1Et9BJEd9nJGUusjHXNt4dGbNNF");

pub mod instructions;
pub mod constants;
pub mod state;
use instructions::*;


#[program]
pub mod basic {
    use super::*;

    pub fn initialize_mint(ctx: Context<InitializeMint>, args: CreateMintAccountArgs, target_currency: String) -> Result<()> {
        create_stablecoin(ctx, args, target_currency)?;
        Ok(())
    }

    pub fn deposit_bonds_and_mint_stablecoins(ctx: Context<DepositAndMint>, amount: u64) -> Result<()> {
        process_deposit_bonds_and_mint_stablecoins(ctx, amount)?;
        Ok(())
    }

    pub fn burn_stablecoins_and_redeem_bonds(ctx: Context<BurnAndRedeem>, amount:u64) -> Result<()> {
        process_burn_stablecoins_and_redeem_stablebonds(ctx, amount)?;
        Ok(())
    }
}


