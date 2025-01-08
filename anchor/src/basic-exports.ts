// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import StablefunIdl from '../target/idl/stablefun.json'
import type { Stablefun } from '../target/types/stablefun'

// Re-export the generated IDL and type
export { Stablefun, StablefunIdl }

// The programId is imported from the program IDL.
export const BASIC_PROGRAM_ID = new PublicKey(StablefunIdl.address)

// This is a helper function to get the Basic Anchor program.
export function getBasicProgram(provider: AnchorProvider) {
  return new Program(StablefunIdl as Stablefun, provider)
}