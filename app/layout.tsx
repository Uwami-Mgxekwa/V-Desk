import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VoidDesk',
  description: 'Created by Owami Mgxekwa',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
