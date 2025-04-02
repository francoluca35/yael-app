import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// src/app/layout.js
export const metadata = {
  title: 'Yael app',
  description: 'App web instalable con Next.js + PWA',
  themeColor: '#1111',
  icons: {
    icon: '/favicon.ico',
  },
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
