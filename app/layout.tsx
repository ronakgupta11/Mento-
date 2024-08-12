
// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Providers } from './Providers'
import { cookieToInitialState } from 'wagmi'

import { config } from '@/config'
import Web3ModalProvider from '@/context'
import Navbar from "../components/Navbar"

export const metadata: Metadata = {
  title: 'ChessApp',
  description: 'Win Like A hero'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body>
        <Web3ModalProvider initialState={initialState}>
          <Providers>


          {children}
          </Providers>
          </Web3ModalProvider>
      </body>
    </html>
  )
}