import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Coins, LineChart, Users, Wallet } from 'lucide-react'
import Link from "next/link"

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold">Create Your Own Stablecoins</h1>
        <p className="text-xl text-gray-400">
          Build and manage yield-bearing stablecoins backed by stablebond tokens on Solana
        </p>
        <Button className="bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold" asChild>
          <Link href="/stablecoins">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {howItWorksData.map((item, index) => (
          <Card key={index} className="bg-gray-900/10 backdrop-blur-md border-gray-800 hover:border-[#1DB954] transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <item.icon className="h-6 w-6 text-[#1DB954]" />
                <span>{item.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid md:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="bg-gray-900/10 backdrop-blur-md border-gray-800">
            <CardHeader>
              <CardTitle className="text-sm text-gray-400">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-mono font-bold bg-gradient-to-r from-[#1DB954] to-[#1ED760] text-transparent bg-clip-text">
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}

const howItWorksData = [
  {
    icon: LineChart,
    title: "Yield-bearing",
    description: "Earn yield from your stablebond collateral while maintaining stability",
  },
  {
    icon: Wallet,
    title: "Stablebond-backed",
    description: "Fully collateralized by government bonds for maximum security",
  },
  {
    icon: Coins,
    title: "Multi-currency",
    description: "Create stablecoins pegged to various fiat currencies",
  },
]

const statsData = [
  { title: "Total Value Locked", value: "$1,234,567,890" },
  { title: "Average APY", value: "4.32%" },
  { title: "Total Stablecoins", value: "15" },
  { title: "Total Holders", value: "12,345" },
]

