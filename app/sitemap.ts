import { MetadataRoute } from 'next'
import { getAgencies } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const agencies = await getAgencies()
  
  const agencyUrls = agencies.map((agency) => ({
    url: `https://agencylist.ai/agency/${agency.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://agencylist.ai',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://agencylist.ai/agencies',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://agencylist.ai/submit',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...agencyUrls,
  ]
}
