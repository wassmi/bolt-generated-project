'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAgency, updateAgency, createAgency, Agency, Badge } from '../../../../lib/api'

export default function AgencyForm({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [agency, setAgency] = useState<Partial<Agency>>({
    name: '',
    shortDescription: '',
    fullDescription: '',
    services: [],
    email: '',
    website: '',
    image: '',
    rating: 0,
    reviewCount: 0,
    phone: '',
    location: '',
    badges: [],
    featured: false,
  })

  useEffect(() => {
    if (params.id !== 'new') {
      getAgency(params.id).then(setAgency)
    }
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAgency(prev => ({ ...prev, [name]: value }))
  }

  const handleServicesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgency(prev => ({ ...prev, services: e.target.value.split(',').map(s => s.trim()) }))
  }

  const handleBadgeChange = (type: Badge['type']) => {
    setAgency(prev => {
      const badges = prev.badges || []
      const index = badges.findIndex(b => b.type === type)
      if (index !== -1) {
        return { ...prev, badges: badges.filter(b => b.type !== type) }
      } else {
        return { ...prev, badges: [...badges, { type, text: type }] }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (params.id === 'new') {
      await createAgency(agency as Agency)
    } else {
      await updateAgency(params.id, agency)
    }
    router.push('/admin/agencies')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{params.id === 'new' ? 'Add New Agency' : 'Edit Agency'}</h1>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-semibold">Agency Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={agency.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="shortDescription" className="block mb-2 font-semibold">Short Description</label>
        <input
          type="text"
          id="shortDescription"
          name="shortDescription"
          value={agency.shortDescription}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fullDescription" className="block mb-2 font-semibold">Full Description</label>
        <textarea
          id="fullDescription"
          name="fullDescription"
          value={agency.fullDescription}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
          rows={4}
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="services" className="block mb-2 font-semibold">Services (comma-separated)</label>
        <input
          type="text"
          id="services"
          name="services"
          value={agency.services?.join(', ')}
          onChange={handleServicesChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={agency.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="website" className="block mb-2 font-semibold">Website</label>
        <input
          type="url"
          id="website"
          name="website"
          value={agency.website}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block mb-2 font-semibold">Image URL</label>
        <input
          type="url"
          id="image"
          name="image"
          value={agency.image}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rating" className="block mb-2 font-semibold">Rating</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={agency.rating}
          onChange={handleChange}
          required
          min="0"
          max="5"
          step="0.1"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="reviewCount" className="block mb-2 font-semibold">Review Count</label>
        <input
          type="number"
          id="reviewCount"
          name="reviewCount"
          value={agency.reviewCount}
          onChange={handleChange}
          required
          min="0"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block mb-2 font-semibold">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={agency.phone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block mb-2 font-semibold">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={agency.location}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Badges</label>
        <div className="space-y-2">
          {['New', 'Top rated', 'Ad', 'Featured'].map((badgeType) => (
            <label key={badgeType} className="flex items-center">
              <input
                type="checkbox"
                checked={agency.badges?.some(b => b.type === badgeType)}
                onChange={() => handleBadgeChange(badgeType as Badge['type'])}
                className="mr-2"
              />
              {badgeType}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            checked={agency.featured}
            onChange={(e) => setAgency(prev => ({ ...prev, featured: e.target.checked }))}
            className="mr-2"
          />
          Featured
        </label>
      </div>
      <button type="submit" className="bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700">
        {params.id === 'new' ? 'Create Agency' : 'Update Agency'}
      </button>
    </form>
  )
}
