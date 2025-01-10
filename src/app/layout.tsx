import './globals.css'
import type { Metadata } from "next"
import { Inter } from 'next/font/google'

import {ClusterProvider} from '@/components/cluster/cluster-data-access'
import {SolanaProvider} from '@/components/solana/solana-provider'
import {UiLayout} from '@/components/ui/ui-layout'
import {ReactQueryProvider} from './react-query-provider'
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "stable.fun - Yield-Bearing Stablecoins",
  description: "Create and manage yield-bearing stablecoins backed by stablebond tokens on Solana",
}
const inter = Inter({ subsets: ["latin"] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
              </ThemeProvider>
            </SolanaProvider>        
          </ClusterProvider>
        </ReactQueryProvider>

      </body>
    </html>
  )
}
// const links: { label: string; path: string }[] = [
//   { label: 'Account', path: '/account' },
//   { label: 'Clusters', path: '/clusters' },
//   { label: 'Basic Program', path: '/basic' },
// ]

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <ReactQueryProvider>
//           <ClusterProvider>
//             <SolanaProvider>
//               <UiLayout links={links}>{children}</UiLayout>
//             </SolanaProvider>
//           </ClusterProvider>
//         </ReactQueryProvider>
//       </body>
//     </html>
//   )
// }
