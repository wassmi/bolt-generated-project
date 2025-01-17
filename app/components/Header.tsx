'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/agencies?search=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-rose-600">
            AgencyList.ai
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/agencies" className="hover:bg-gray-100 px-3 py-2 rounded-full">
              Browse Agencies
            </Link>
            <Link href="/submit" className="hover:bg-gray-100 px-3 py-2 rounded-full">
              List Your Agency
            </Link>
            <button className="bg-rose-600 text-white px-4 py-2 rounded-full hover:bg-rose-700">
              Sign Up
            </button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <Link href="/agencies" className="block py-2">Browse Agencies</Link>
            <Link href="/submit" className="block py-2">List Your Agency</Link>
            <button className="w-full bg-rose-600 text-white px-4 py-2 rounded-full hover:bg-rose-700 mt-2">
              Sign Up
            </button>
          </div>
        )}
      </div>
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search for AI agencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button
              type="submit"
              className="bg-rose-600 text-white p-2 rounded-r-full hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <Search />
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
