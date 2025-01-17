import Link from 'next/link'
import Image from 'next/image'
import { getAgencies } from '../../lib/api'
import { Star } from 'lucide-react'

export default async function AgenciesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const agencies = await getAgencies()
  const searchTerm = typeof searchParams.search === 'string' ? searchParams.search : ''
  const category = typeof searchParams.category === 'string' ? searchParams.category : ''

  const filteredAgencies = agencies.filter((agency) => {
    const matchesSearch = searchTerm
      ? agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agency.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    const matchesCategory = category
      ? agency.services.some((service) => service.toLowerCase() === category.toLowerCase())
      : true
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">
        {searchTerm ? `Search Results for "${searchTerm}"` : 'All AI Agencies'}
      </h1>
      {category && (
        <p className="text-xl mb-8">
          Showing agencies in the <span className="font-semibold">{category}</span> category
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAgencies.map((agency) => (
          <Link key={agency.id} href={`/agency/${agency.id}`} className="block">
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <Image
                src={agency.image || '/placeholder.svg'}
                alt={agency.name}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
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
      {filteredAgencies.length === 0 && (
        <p className="text-xl text-center mt-12">No agencies found. Try adjusting your search criteria.</p>
      )}
    </div>
  )
}
