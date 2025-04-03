import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// app/layout.js
export const metadata = {
  title: "Yael App",
  description: "Sistema de reservas de canchas",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon.png",
    apple: "/icons/icon.png",
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
