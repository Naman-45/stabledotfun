use anchor_lang::prelude::*;
use anchor_spl::{token_interface::{Token2022, Mint, TokenAccount, TransferChecked, transfer_checked, MintTo, mint_to}, associated_token::AssociatedToken};

use crate::state::{Collateral, MintConfig};

#[derive(Accounts)]
pub struct DepositAndMint<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        init_if_needed,
        space = 8 + Collateral::INIT_SPACE,
        payer = signer,
        seeds = [b"collateral", stablecoin_mint.key().as_ref(), signer.key().as_ref()],
        bump
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

    #[account(
        mut,
        associated_token::authority = signer,
        associated_token::mint = deposited_stablebond_mint
    )]
    pub user_stablebond_account: InterfaceAccount<'info, TokenAccount>,

    #[account(mut)]
    pub deposited_stablebond_mint: InterfaceAccount<'info, Mint>,

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

    #[account(
        init_if_needed,
        payer = signer,
        associated_token::mint = stablecoin_mint,
        associated_token::authority = signer,
        associated_token::token_program = token_program
    )]
    pub stablecoin_token_account: InterfaceAccount<'info, TokenAccount>,

    #[account(
        init_if_needed,
        payer = signer,
        associated_token::mint = deposited_stablebond_mint,
        associated_token::token_program = token_program,
        associated_token::authority= collateral_bond_token_account
    )]
    pub collateral_bond_token_account: InterfaceAccount<'info, TokenAccount>,

    pub token_program: Program<'info, Token2022>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>
}

pub fn process_deposit_bonds_and_mint_stablecoins(ctx: Context<DepositAndMint>, amount: u64) -> Result<()> {

    let collateral_account = &mut ctx.accounts.collateral_account;
    collateral_account.stablebond_balance = ctx.accounts.collateral_bond_token_account.amount + amount;
    collateral_account.stablecoin_minted += amount;

    if !collateral_account.is_initialized {
        collateral_account.is_initialized = true;
        collateral_account.collateral_bond_token_account = ctx.accounts.collateral_bond_token_account.key();
        collateral_account.signer = ctx.accounts.signer.key();
        collateral_account.stablecoin_token_account = ctx.accounts.stablecoin_token_account.key();
        collateral_account.collateral_bump = ctx.bumps.collateral_account;
    }

    require!(ctx.accounts.user_stablebond_account.amount > amount, ErrorCode::InsufficientBondBalance);

    let deposit_accounts = TransferChecked {
        from: ctx.accounts.user_stablebond_account.to_account_info(),
        mint: ctx.accounts.deposited_stablebond_mint.to_account_info(),
        to: ctx.accounts.collateral_bond_token_account.to_account_info(),
        authority: ctx.accounts.signer.to_account_info()
    };

    let cpi_context_deposit = CpiContext::new(ctx.accounts.token_program.to_account_info(), deposit_accounts);

    transfer_checked(cpi_context_deposit, amount, ctx.accounts.deposited_stablebond_mint.decimals)?;

    let mint_seeds = &[
            ctx.accounts.config.name.as_bytes(),
            ctx.accounts.config.target_fiat_currency.as_bytes(),
            ctx.accounts.config.signer.as_ref(),
            &[ctx.accounts.config.mint_bump]
        ];
        let mint_signer_seeds = &[&mint_seeds[..]];

    let mint_accounts = MintTo {
        mint: ctx.accounts.deposited_stablebond_mint.to_account_info(),
        to: ctx.accounts.stablecoin_token_account.to_account_info(),
        authority: ctx.accounts.stablecoin_mint.to_account_info()
    };

    let mint_cpi_context = CpiContext::new_with_signer(ctx.accounts.token_program.to_account_info()
                                                        , mint_accounts, mint_signer_seeds);
     
    mint_to(mint_cpi_context, amount)?;

    Ok(())
}

#[error_code]
pub enum ErrorCode {
    #[msg("Insufficient StableBond Balance")]
    InsufficientBondBalance,
    #[msg("INvalid Authority")]
    InvalidAuthority
}