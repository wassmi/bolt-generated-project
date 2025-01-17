'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/agencies?search=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Find the Perfect AI Agency</h1>
      <form onSubmit={handleSearch} className="flex items-center mb-8">
        <input
          type="text"
          placeholder="Search for AI agencies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
        <button
          type="submit"
          className="bg-rose-600 text-white px-6 py-2 rounded-r-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Popular Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Robotics', 'Data Science', 'AI Consulting'].map((category) => (
            <button
              key={category}
              onClick={() => router.push(`/agencies?category=${encodeURIComponent(category)}`)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-full"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
