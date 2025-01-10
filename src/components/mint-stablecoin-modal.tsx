"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { STABLEFUN_PROGRAM_ID as programId, getStableFunProgram } from '@project/anchor'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useCluster } from '@/components/cluster/cluster-data-access'
import { useAnchorProvider } from '@/components/solana/solana-provider'
import { useTransactionToast } from '@/components/ui/ui-layout'
import {BN} from '@coral-xyz/anchor'
import { PublicKey } from "@solana/web3.js"

interface MintStablecoinModalProps {
  stablecoin: {
    name: string;
    symbol: string;
    mintAddress: string;
  };
}

export function MintStablecoinModal({ stablecoin }: MintStablecoinModalProps) {
    const [amount, setAmount] = useState<number>(0)

    const { cluster } = useCluster();
    const transactionToast = useTransactionToast();
    const provider = useAnchorProvider();
    const program = getStableFunProgram(provider);

    const stablebondMint = new PublicKey(stablecoin.mintAddress);

  const mintStablecoinWithBondTx = useMutation(
    {
      mutationKey: ['mint', 'stablecoin','bond', { cluster }],
      mutationFn: async () => {
        return await program.methods.depositBondsAndMintStablecoins(
         new BN(amount)
        ).accounts({
          depositedStablebondMint: stablebondMint, 
        }).rpc();
      },
      onSuccess: (signature: string) => {
        transactionToast(signature);
      },
      onError: () => toast.error('Failed to mint Stablecoin'),
    }
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold">
          Mint {stablecoin.name}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Mint {stablecoin.name}</DialogTitle>
          <DialogDescription>
            Choose your minting method and enter the amount to mint.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="stablebond">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stablebond">Stablebond Deposit</TabsTrigger>
            <TabsTrigger value="usdc">USDC Deposit</TabsTrigger>
          </TabsList>
          <TabsContent value="stablebond" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stablebond-amount">Stablebond Amount</Label>
              <Input
                id="stablebond-amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            {amount && (
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Expected Stablecoin Output</p>
                <p className="text-lg font-mono font-bold">{amount} {stablecoin.symbol}</p>
                <p className="text-sm text-gray-400">Current Exchange Rate: 1:1</p>
              </div>
            )}
            <Button className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold" onClick={() => {
              mintStablecoinWithBondTx.mutateAsync();
            }}>
              Mint with Stablebond
            </Button>
          </TabsContent>
          <TabsContent value="usdc" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="usdc-amount">USDC Amount</Label>
              <Input
                id="usdc-amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            {amount && (
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Expected Stablecoin Output</p>
                <p className="text-lg font-mono font-bold">{amount} {stablecoin.symbol}</p>
                <p className="text-sm text-gray-400">Conversion Flow: USDC → Stablebond → Stablecoin</p>
                <p className="text-sm text-gray-400">Current Exchange Rates: USDC to Stablebond: 1:1, Stablebond to Stablecoin: 1:1</p>
              </div>
            )}
            <Button className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold">
              Mint with USDC
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

