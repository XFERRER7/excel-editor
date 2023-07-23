import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Flex } from 'next/font/google'

const roboto = Roboto_Flex({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Excel editor',
  description: 'Web execel editor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
