import Link from 'next/link'
import Image from 'next/image'
import { getAgencies } from '../lib/api'
import { Star } from 'lucide-react'

export default async function Home() {
  const agencies = await getAgencies()
  const featuredAgencies = agencies.filter(agency => agency.featured)

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-8">Featured AI Agencies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAgencies.map((agency) => (
            <Link key={agency.id} href={`/agency/${agency.id}`} className="block">
              <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <Image src={agency.image || "/placeholder.svg"} alt={agency.name} width={400} height={200} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold">{agency.name}</h2>
                    <div className="flex flex-wrap">
                      {agency.badges.map((badge) => (
                        <span key={badge.type} className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded-full ml-2 mb-2">
                          {badge.text}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{agency.shortDescription}</p>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 w-5 h-5 mr-1" />
                    <span className="font-semibold">{agency.rating}</span>
                    <span className="text-gray-400 ml-1">({agency.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/agencies" className="inline-block bg-rose-600 text-white px-6 py-3 rounded-full hover:bg-rose-700">
            View All Agencies
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Robotics', 'Data Science', 'AI Consulting', 'Chatbots', 'Predictive Analytics'].map((category) => (
            <Link key={category} href={`/agencies?category=${encodeURIComponent(category)}`} className="block">
              <div className="border rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold">{category}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Why Choose AgencyList.ai?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
            <p className="text-gray-600">We handpick the best AI agencies to ensure quality and reliability.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-xl font-semibold mb-2">Diverse Expertise</h3>
            <p className="text-gray-600">Find agencies specializing in various AI domains to match your needs.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Easy Collaboration</h3>
            <p className="text-gray-600">Connect with agencies and start your AI project with ease.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-12 px-4 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Are You an AI Agency?</h2>
          <p className="text-xl mb-8">Join our platform and connect with clients looking for your expertise.</p>
          <Link href="/submit" className="inline-block bg-rose-600 text-white px-8 py-3 rounded-full hover:bg-rose-700 text-lg font-semibold">
            List Your Agency
          </Link>
        </div>
      </section>
    </div>
  )
}
