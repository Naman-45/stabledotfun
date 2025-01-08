use anchor_lang::prelude::*;
use anchor_spl::{
    token_interface::{
         Mint, TokenAccount, 
        Burn, burn, TransferChecked, transfer_checked
    },
    token_2022::Token2022
};
use crate::state::{ Collateral, MintConfig};

#[derive(Accounts)]
pub struct BurnAndRedeem<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        mut,
        seeds = [b"collateral", stablecoin_mint.key().as_ref(), signer.key().as_ref()],
        bump = collateral_account.collateral_bump,
        has_one = signer @ ErrorCode::InvalidDepositor,
        has_one = collateral_bond_token_account @ ErrorCode::InvalidCollateralAccount,
        has_one = stablecoin_token_account @ ErrorCode::InvalidStablecoinAccount,
    )]
    pub collateral_account: Account<'info, Collateral>,

    #[account(
        mut,
        seeds = [
            config.name.as_bytes(),
            config.target_fiat_currency.as_bytes(),
            config.signer.as_ref()
        ],
        bump,
        has_one = signer @ ErrorCode::InvalidAuthority
    )]
    pub config: Account<'info, MintConfig>,

    // User's stablecoin account to burn from
    #[account(
        mut,
        associated_token::authority = signer,
        associated_token::mint = stablecoin_mint
    )]
    pub stablecoin_token_account: InterfaceAccount<'info, TokenAccount>,

    // The stablecoin mint to burn
    #[account(
        mut,
        seeds = [
            config.name.as_bytes(),
            config.target_fiat_currency.as_bytes(),
            config.signer.as_ref()
        ],
        bump = config.mint_bump
    )]
    pub stablecoin_mint: Box<InterfaceAccount<'info, Mint>>,

    // User's stablebond account to receive redeemed bonds
    #[account(
        mut,
        associated_token::authority = signer,
        associated_token::mint = deposited_stablebond_mint
    )]
    pub user_stablebond_account: InterfaceAccount<'info, TokenAccount>,

    #[account(mut)]
    pub deposited_stablebond_mint: InterfaceAccount<'info, Mint>,

    // Program's stablebond holding account
    #[account(
        mut,
        associated_token::mint = deposited_stablebond_mint,
        associated_token::authority = collateral_account
    )]
    pub collateral_bond_token_account: InterfaceAccount<'info, TokenAccount>,

    pub token_program: Program<'info, Token2022>,
    pub system_program: Program<'info, System>
}

pub fn process_burn_stablecoins_and_redeem_stablebonds(ctx: Context<BurnAndRedeem>, amount: u64) -> Result<()> {
    let collateral_account = &mut ctx.accounts.collateral_account;
    
    // Verify sufficient balances
    require!(
        ctx.accounts.stablecoin_token_account.amount >= amount,
        ErrorCode::InsufficientStablecoinBalance
    );
    require!(
        ctx.accounts.collateral_bond_token_account.amount >= amount,
        ErrorCode::InsufficientCollateralBalance
    );

    // Update collateral account state
    collateral_account.stablebond_balance = collateral_account.stablebond_balance.checked_sub(amount)
        .ok_or(ErrorCode::ArithmeticError)?;
    collateral_account.stablecoin_minted = collateral_account.stablecoin_minted.checked_sub(amount)
        .ok_or(ErrorCode::ArithmeticError)?;

    // First burn the stablecoins
    let burn_accounts = Burn {
        mint: ctx.accounts.stablecoin_mint.to_account_info(),
        from: ctx.accounts.stablecoin_token_account.to_account_info(),
        authority: ctx.accounts.signer.to_account_info(),
    };

    let burn_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        burn_accounts,
    );

    burn(burn_ctx, amount)?;


    // Store the keys before creating seeds array
    let mint_key = ctx.accounts.stablecoin_mint.key();
    let signer_key = ctx.accounts.signer.key();
    
    // Then transfer back the stablebonds from collateral to user
    let collateral_seeds = &[
        b"collateral",
        mint_key.as_ref(),
        signer_key.as_ref(),
        &[ctx.accounts.collateral_account.collateral_bump]
    ];
    let signer_seeds = &[&collateral_seeds[..]];

    let transfer_accounts = TransferChecked {
        from: ctx.accounts.collateral_bond_token_account.to_account_info(),
        mint: ctx.accounts.deposited_stablebond_mint.to_account_info(),
        to: ctx.accounts.user_stablebond_account.to_account_info(),
        authority: ctx.accounts.collateral_account.to_account_info(),
    };

    let transfer_ctx = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        transfer_accounts,
        signer_seeds
    );

    transfer_checked(transfer_ctx, amount, ctx.accounts.deposited_stablebond_mint.decimals)?;

    Ok(())
}

#[error_code]
pub enum ErrorCode {
    #[msg("Insufficient StableBond Balance")]
    InsufficientBondBalance,
    #[msg("Invalid Authority")]
    InvalidAuthority,
    #[msg("Invalid Depositor")]
    InvalidDepositor,
    #[msg("Invalid Collateral Account")]
    InvalidCollateralAccount,
    #[msg("Invalid Stablecoin Account")]
    InvalidStablecoinAccount,
    #[msg("Insufficient Stablecoin Balance")]
    InsufficientStablecoinBalance,
    #[msg("Insufficient Collateral Balance")]
    InsufficientCollateralBalance,
    #[msg("Arithmetic Error")]
    ArithmeticError,
}