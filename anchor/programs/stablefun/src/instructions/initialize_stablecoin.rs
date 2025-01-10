use anchor_lang::prelude::*;
use anchor_spl::token_interface::{ Mint, Token2022, TokenMetadataInitialize, token_metadata_initialize, InterestBearingMintInitialize, interest_bearing_mint_initialize };
use crate::{ constants::MINT_DECIMALS , state::{MintConfig, MintInfo, MintsCreated}};

#[derive(Accounts)]
#[instruction(args: CreateMintAccountArgs, target_currency: String)]
pub struct InitializeMint <'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        init,
        payer = signer,
        mint::token_program = token_program,
        mint::decimals = MINT_DECIMALS,
        mint::authority = mint,
        extensions::metadata_pointer::authority = signer,
        extensions::metadata_pointer::metadata_address = mint,
        seeds = [args.name.as_bytes(), target_currency.as_bytes(), signer.key().as_ref()],
        bump
    )]
    pub mint: Box<InterfaceAccount<'info, Mint>>,

    #[account(
        init_if_needed,
        payer = signer,
        space = 8 + MintsCreated::INIT_SPACE,
        seeds = [b"total_mints_created"],
        bump
    )]
    pub all_mints : Box<Account<'info, MintsCreated>>,

    // #[account(
    //     init,
    //     payer = signer,
    //     space = 8 + MintConfig::INIT_SPACE,
    //     seeds = [args.name.as_bytes(), target_currency.as_bytes(), signer.key().as_ref()],
    //     bump
    // )]
    // pub config: Account<'info, MintConfig>,

    #[account(
        init,
        payer = signer,
        space = 8 + MintConfig::INIT_SPACE,
        seeds = [args.name.as_bytes(), target_currency.as_bytes()],
        bump
    )]
    pub config: Account<'info, MintConfig>,
    
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token2022>
}

#[derive(AnchorDeserialize, AnchorSerialize)]
pub struct CreateMintAccountArgs {
    pub name: String,
    pub symbol: String,
    pub uri: String,
}

impl<'info> InitializeMint<'info> {
    fn initialize_token_metadata(
        &self,
        name: String,
        symbol: String,
        uri: String,
    ) -> Result<()> {
        let cpi_accounts = TokenMetadataInitialize {
            token_program_id: self.token_program.to_account_info(),
            mint: self.mint.to_account_info(),
            metadata: self.mint.to_account_info(), // metadata account is the mint, since data is stored in mint
            mint_authority: self.signer.to_account_info(),
            update_authority: self.signer.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(self.token_program.to_account_info(), cpi_accounts);
        token_metadata_initialize(cpi_ctx, name, symbol, uri)?;
        Ok(())
    }

    fn initialize_interest_bearing_mint(
        &self,
        rate: i16
    ) -> Result<()> {
        let cpi_accounts = InterestBearingMintInitialize {
            token_program_id: self.token_program.to_account_info(),
            mint: self.mint.to_account_info()
        };
        let cpi_ctx = CpiContext::new(self.token_program.to_account_info(), cpi_accounts);

        interest_bearing_mint_initialize(cpi_ctx, Some(self.mint.key()), rate)?;

        Ok(())
    }
}

pub fn create_stablecoin(
    ctx: Context<InitializeMint>,
    args: CreateMintAccountArgs,
    target_currency: String,
    rate: i16,
) -> Result<()> {
    // Initialize token metadata
    ctx.accounts.initialize_token_metadata(
        args.name.clone(),
        args.symbol.clone(),
        args.uri.clone(),
    )?;
    
    // Initialize interest-bearing mint
    ctx.accounts.initialize_interest_bearing_mint(rate)?;

    // Reload mint to ensure we have the latest data
    ctx.accounts.mint.reload()?;

    // Configure mint settings
    *ctx.accounts.config = MintConfig {
        signer: ctx.accounts.signer.key(),
        target_fiat_currency: target_currency,
        mint: ctx.accounts.mint.key(),
        name: args.name,
        icon: args.uri,
        symbol: args.symbol,
        interest_rate: rate,
        mint_bump: ctx.bumps.mint,
        config_bump: ctx.bumps.config,
    };

    // Handle all_mints account
    let all_mints_account = &mut ctx.accounts.all_mints;

    // If the account is not initialized, initialize it
    if !all_mints_account.is_initialized {
        all_mints_account.all_mints = vec![MintInfo {
            public_key: ctx.accounts.mint.key(),
            apy: rate,
        }];
        all_mints_account.bump = ctx.bumps.all_mints;
        all_mints_account.is_initialized = true;
    } else {
        // Check if the vector has reached its maximum length
        if all_mints_account.all_mints.len() >= 100 {
            return Err(ErrorCode::MaxMintsReached.into());
        }

        // Push the new mint info into the all_mints vector
        all_mints_account.all_mints.push(MintInfo {
            public_key: ctx.accounts.mint.key(),
            apy: rate,
        });
    }

    msg!("Mint with desired metadata successfully initialized!");

    Ok(())
}


#[error_code]
pub enum ErrorCode {
    #[msg("The maximum number of mints has been reached.")]
    MaxMintsReached,
}