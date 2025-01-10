"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RedeemModalProps {
  stablecoin: {
    name: string
    symbol: string
    stablebondSymbol: string
  }
}

export function RedeemModal({ stablecoin }: RedeemModalProps) {
  const [amount, setAmount] = useState("")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-black">
          Redeem
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Redeem {stablecoin.name}</DialogTitle>
          <DialogDescription>
            Enter the amount of {stablecoin.symbol} you want to redeem for {stablecoin.stablebondSymbol}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="redeem-amount">Amount to Redeem</Label>
            <Input
              id="redeem-amount"
              type="number"
              placeholder={`Enter ${stablecoin.symbol} amount`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          {amount && (
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Expected Stablebond Return</p>
              <p className="text-lg font-mono font-bold">{amount} {stablecoin.stablebondSymbol}</p>
              <p className="text-sm text-gray-400">Current Exchange Rate: 1:1</p>
            </div>
          )}
          <Button className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold">
            Redeem {stablecoin.symbol}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

