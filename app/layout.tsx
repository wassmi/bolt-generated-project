import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import { NextAuthProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'AgencyList.ai - Find Top AI Agencies',
    template: '%s | AgencyList.ai'
  },
  description: 'Discover and connect with the best AI agencies for your projects. Browse our curated list of top-tier AI service providers.',
  keywords: ['AI agencies', 'artificial intelligence', 'machine learning', 'AI consulting', 'AI development', 'AI solutions'],
  authors: [{ name: 'AgencyList.ai' }],
  creator: 'AgencyList.ai',
  publisher: 'AgencyList.ai',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://agencylist.ai'),
  openGraph: {
    title: 'AgencyList.ai - Find Top AI Agencies',
    description: 'Discover and connect with the best AI agencies for your projects.',
    url: 'https://agencylist.ai',
    siteName: 'AgencyList.ai',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgencyList.ai - Find Top AI Agencies',
    description: 'Discover and connect with the best AI agencies for your projects.',
    creator: '@agencylistai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://agencylist.ai" />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  )
}
