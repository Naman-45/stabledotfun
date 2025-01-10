import Link from "next/link"
import { Atom } from 'lucide-react'
import { WalletButton } from "./solana/solana-provider"

export function Navbar() {
  return (
    <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Atom className="h-8 w-8 text-[#1DB954]" />
          <span className="text-xl font-bold">stable.fun</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          <NavLink href="/">Dashboard</NavLink>
          <NavLink href="/create">Create</NavLink>
          <NavLink href="/portfolio">Portfolio</NavLink>
        </div>
        <WalletButton />
      </div>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors">
      {children}
    </Link>
  )
}