"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as anchor from '@coral-xyz/anchor'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { STABLEFUN_PROGRAM_ID as programId, getStableFunProgram } from '@project/anchor'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useCluster } from '@/components/cluster/cluster-data-access'
import { useAnchorProvider } from '@/components/solana/solana-provider'
import { useTransactionToast } from '@/components/ui/ui-layout'
import {StablebondProgram} from '@etherfuse/stablebond-sdk';
import dotenv from 'dotenv'

dotenv.config();



export default function CreateStablecoin() {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [name, setName] = useState("")
  const [uri, setUri] = useState("")
  const [symbol, setSymbol] = useState("")
  const [rate, setRate] = useState<number>(0);
  
  const { publicKey} = useWallet();
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const program = getStableFunProgram(provider);
  
  const createStablecoinTx = useMutation(
    {
      mutationKey: ['create', 'stablecoin', { cluster }],
      mutationFn: async () => {
        return await program.methods.initializeMint(
          {
            name,
           symbol,
            uri
          },
           selectedCurrency,
           rate
        ).rpc();
      },
      onSuccess: (signature: string) => {
        transactionToast(signature);
      },
      onError: () => toast.error('Failed to initialize stablecoin'),
    }
  );

  async function getRate(){

    let bondMint = '';
    if(selectedCurrency === 'mxn') {
      bondMint = "EyvBnTz9QDVc2oaBVeu77kndynmD5njrWjZghYh5xpUk"
    } else{
      selectedCurrency === 'gbp' ? bondMint = "A433vq62iQbDToDeZ3XZcWj1VWFHYB95SYwnZgSoEmXy" : bondMint = "BoTpvjYEDn8esZDrBkipexoUMeSBQ9DDG6A5mtzsDGSt"
    }
    const bond = await StablebondProgram.getBond(process.env.RPC_ENDPOINT_URL, bondMint);

     setRate(bond.currentIssuance.interestRateBps);

  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gray-900/10 backdrop-blur-md border-gray-800">
        <CardHeader>
          <CardTitle>Create Stablecoin</CardTitle>
          <CardDescription>
            Create your own yield-bearing stablecoin backed by stablebond tokens. Choose your currency, set your parameters, and start earning yield on your stablecoin issuance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="e.g., Mexican Peso Stable" value={name} onChange={(e) => {setName(e.target.value)}}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="symbol">Symbol</Label>
              <Input id="symbol" placeholder="e.g., mxnSTABLE" value={symbol} onChange={(e) => {setSymbol(e.target.value)}}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Icon URL</Label>
              <Input id="icon" type="url" placeholder="https://example.com/icon.png" value={uri} onChange={(e) => {setUri(e.target.value)}}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Target Currency</Label>
              <Select onValueChange={setSelectedCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="mxn">MXN</SelectItem>
                  <SelectItem value="gbp">GBP</SelectItem>
                </SelectContent>
              </Select>
              {selectedCurrency && (
                <p className="text-sm text-gray-400">
                  Backed by {selectedCurrency.toUpperCase()}BOND with current APY: 3.5%
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Platform Fees</Label>
              <p className="text-sm text-gray-400">0.1% of minted stablecoins</p>
            </div>
            <Button className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold" onClick={() => {
              getRate(),
              createStablecoinTx.mutateAsync()
            }}>
              Create Stablecoin
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

