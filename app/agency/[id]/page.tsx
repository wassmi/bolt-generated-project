import Image from 'next/image'
import { Metadata } from 'next'
import { getAgency } from '../../../lib/api'
import { notFound } from 'next/navigation'
import { Star, Check } from 'lucide-react'
import ReviewCard from '../../components/ReviewCard'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const agency = await getAgency(params.id)
  
  if (!agency) {
    return {
      title: 'Agency Not Found',
    }
  }

  return {
    title: `${agency.name} - AI Agency Profile`,
    description: agency.shortDescription,
    openGraph: {
      title: `${agency.name} - AI Agency Profile`,
      description: agency.shortDescription,
      images: [agency.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${agency.name} - AI Agency Profile`,
      description: agency.shortDescription,
      images: [agency.image],
    },
  }
}

export default async function AgencyProfile({ params }: { params: { id: string } }) {
  const agency = await getAgency(params.id)

  if (!agency) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Image src={agency.image || "/placeholder.svg"} alt={agency.name} width={1200} height={600} className="w-full h-[400px] object-cover rounded-lg" />
      </div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{agency.name}</h1>
          <p className="text-xl text-gray-600 mb-2">{agency.shortDescription}</p>
          <div className="flex items-center">
            <Star className="text-yellow-400 mr-1" />
            <span className="font-semibold">{agency.rating}</span>
            <span className="text-gray-400 ml-1">({agency.reviewCount} reviews)</span>
          </div>
        </div>
        <button className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700">
          Contact Agency
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="col-span-2">
          <h2 className="text-2xl font-semibold mb-4">About {agency.name}</h2>
          <p className="mb-4">{agency.fullDescription}</p>
          <h3 className="text-xl font-semibold mb-2">Services</h3>
          <ul className="grid grid-cols-2 gap-2 mb-4">
            {agency.services.map((service, index) => (
              <li key={index} className="flex items-center">
                <Check className="text-green-500 mr-2" />
                {service}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <p className="mb-2"><strong>Email:</strong> {agency.email}</p>
            <p className="mb-2"><strong>Phone:</strong> {agency.phone}</p>
            <p className="mb-2"><strong>Website:</strong> <a href={agency.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{agency.website}</a></p>
            <p><strong>Location:</strong> {agency.location}</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {agency.reviews.map((review, index) => (
          <ReviewCard
            key={index}
            author={review.author}
            date={review.date}
            rating={review.rating}
            content={review.content}
          />
        ))}
      </div>
    </div>
  )
}
