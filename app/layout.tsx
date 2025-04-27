import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: 'Yasar Abbas',
  description: 'A timeline of my professional career, education, skills and interests',
  generator: 'v0.dev',
  icons: {
    icon: 'favicon.webp',
    shortcut: 'favicon.webp',
    apple: 'favicon.webp',
    other: [
      {
        rel: 'icon',
        type: 'image/jpeg',
        url: 'favicon.jpg',
      },
    ],
  },
  openGraph: {
    title: 'Yasar Abbas',
    description: 'A timeline of my professional career, education, skills and interests',
    images: [
      {
        url: 'favicon.webp',
        width: 800,
        height: 800,
        alt: 'Profile Image',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yasar Abbas',
    description: 'A timeline of my professional career, education, skills and interests',
    images: ['favicon.webp'],
    creator: '@username',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn("min-h-screen antialiased", inter.className)}>
        <ThemeProvider forcedTheme="dark" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
