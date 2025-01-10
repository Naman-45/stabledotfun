"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RedeemModal } from "@/components/redeem-modal"
import Image from "next/image"

export default function Portfolio() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Portfolio</h1>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.map((item, index) => (
          <Card key={index} className="bg-gray-900/10 backdrop-blur-md border-gray-800 hover:border-[#1DB954] transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Image src={item.icon} alt={item.name} width={2} height={2} className="w-6 h-6" />
                <span>{item.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Current Balance</p>
                <p className="text-2xl font-mono font-bold bg-gradient-to-r from-[#1DB954] to-[#1ED760] text-transparent bg-clip-text">
                  {item.balance} {item.symbol}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">APY</p>
                <p className="text-lg font-mono font-bold text-[#1DB954]">{item.apy}%</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Value in USD</p>
                <p className="text-lg font-mono font-bold">${item.valueUSD}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Underlying Stablebond</p>
                <p className="text-lg font-mono">{item.stablebond} {item.stablebondSymbol}</p>
              </div>
              <div className="flex space-x-2">
                <RedeemModal stablecoin={item} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-gray-900/10 backdrop-blur-md border-gray-800">
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Total Portfolio Value</p>
            <p className="text-3xl font-mono font-bold bg-gradient-to-r from-[#1DB954] to-[#1ED760] text-transparent bg-clip-text">
              ${portfolioSummary.totalValue}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Total Yield Earned</p>
            <p className="text-2xl font-mono font-bold text-[#1DB954]">${portfolioSummary.totalYield}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const portfolioData = [
  {
    name: "USD Stable",
    symbol: "USDSTABLE",
    icon: "/usd-icon.png",
    balance: "1000.00",
    apy: 3.5,
    valueUSD: "1000.00",
    stablebond: "1000.00",
    stablebondSymbol: "USDBOND",
  },
  {
    name: "Euro Stable",
    symbol: "EURSTABLE",
    icon: "/eur-icon.png",
    balance: "850.00",
    apy: 2.8,
    valueUSD: "935.00",
    stablebond: "850.00",
    stablebondSymbol: "EURBOND",
  },
  {
    name: "British Pound Stable",
    symbol: "GBPSTABLE",
    icon: "/gbp-icon.png",
    balance: "750.00",
    apy: 3.2,
    valueUSD: "975.00",
    stablebond: "750.00",
    stablebondSymbol: "GBPBOND",
  },
]

const portfolioSummary = {
  totalValue: "2910.00",
  totalYield: "87.30",
}

