"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Check } from 'lucide-react'
import { MintStablecoinModal } from "@/components/mint-stablecoin-modal"
import Image from "next/image"
import { clusterApiUrl, PublicKey } from "@solana/web3.js"
import { useConnection } from "@solana/wallet-adapter-react"
import {StablebondProgram} from '@etherfuse/stablebond-sdk';
import { STABLEFUN_PROGRAM_ID } from "@project/anchor"
import { useAnchorProvider } from '@/components/solana/solana-provider'
import { STABLEFUN_PROGRAM_ID as programId, getStableFunProgram } from '@project/anchor'
import { getMint, getTokenMetadata } from "@solana/spl-token"
import dotenv from 'dotenv';

dotenv.config();

interface Coin {
  name: string | undefined;
  symbol: string | undefined;
  icon: string | undefined;
  apy: number;
  mintAddress: string | undefined;
}

// const stablecoins = [
//   {
//     name: "USD Stable",
//     symbol: "USDSTABLE",
//     icon: "/usd-icon.png",
//     apy: 3.5,
//     mintAddress: "7nE9...X4p2",
//   },
//   {
//     name: "Euro Stable",
//     symbol: "EURSTABLE",
//     icon: "/eur-icon.png",
//     apy: 2.8,
//     mintAddress: "9kL7...M3r5",
//   },
//   {
//     name: "British Pound Stable",
//     symbol: "GBPSTABLE",
//     icon: "/gbp-icon.png",
//     apy: 3.2,
//     mintAddress: "2pF8...K9s1",
//   },
// ]


export default function Stablecoins() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const { connection } = useConnection();
  const provider = useAnchorProvider();
  const program = getStableFunProgram(provider);
  const [stablecoins, setStablecoins] = useState<Coin[]>([]);

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopiedAddress(address)
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  useEffect(() => {
    async function fetchMints() {
      const allMintsCreatedPda = PublicKey.findProgramAddressSync(
        [Buffer.from('total_mints_created')],
        STABLEFUN_PROGRAM_ID
      )[0];
  
      // Fetch the on-chain account data
      const ParsedAccountInfo = await program.account.mintsCreated.fetch(allMintsCreatedPda);
  
      // Process each mint in the allMints array
      const stablecoins = await Promise.all(
        ParsedAccountInfo.allMints.map(async ({ publicKey, apy }) => {
          const mintStruct = await getMint(connection, publicKey);
          const metadata = await getTokenMetadata(connection, mintStruct.address);
  
          return {
            name: metadata?.name,
            symbol: metadata?.symbol,
            icon: metadata?.uri,
            apy: apy,
            mintAddress: JSON.stringify(metadata?.mint),
          };
        })
      );

    }
  
    fetchMints();
  }, [program, connection]); 
  
      //@ts-ignore
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Available Stablecoins</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  
        {stablecoins.map((coin) => (
          <Card key={coin.symbol} className="bg-gray-900/10 backdrop-blur-md border-gray-800 hover:border-[#1DB954] transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Image src={coin.icon ?? ''} alt={coin.name ?? ''} width={2} height={2} className="w-6 h-6" />
                <span>{coin.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Symbol</p>
                <p className="text-lg font-mono font-bold">{coin.symbol}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">APY</p>
                <p className="text-lg font-mono font-bold text-[#1DB954]">{coin.apy}%</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Mint Address</p>
                <div className="flex items-center space-x-2">
                  <Input value={coin.mintAddress} readOnly className="bg-gray-800 text-gray-300" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(coin.mintAddress ?? '')}
                    className="border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-black"
                  >
                    {copiedAddress === coin.mintAddress ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <MintStablecoinModal stablecoin={coin} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

