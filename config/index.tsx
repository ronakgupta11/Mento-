
// config/index.tsx

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia,baseSepolia, base } from 'wagmi/chains'

// Your WalletConnect Cloud project ID
export const projectId = '86937ba7763c4124606014c43955c595'

// Create a metadata object
const metadata = {
  name: 'mento',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [mainnet,sepolia,baseSepolia,base] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
 // Optional - Override createConfig parameters
})