'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { batchImportAgencies } from '../../../../lib/api'

export default function ImportAgencies() {
  const [file, setFile] = useState<File | null>(null)
  const [importing, setImporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setImporting(true)
    setError(null)

    try {
      const content = await file.text()
      let agencies
      
      if (file.name.endsWith('.json')) {
        agencies = JSON.parse(content)
      } else if (file.name.endsWith('.csv')) {
        // Basic CSV parsing (you might want to use a library for more complex CSVs)
        agencies = content.split('\n').slice(1).map(line => {
          const [name, shortDescription, fullDescription, services, email, website, image, rating, reviewCount, phone, location] = line.split(',')
          return {
            name, shortDescription, fullDescription, 
            services: services.split(';'), 
            email, website, image,
            rating: parseFloat(rating),
            reviewCount: parseInt(reviewCount),
            phone, location,
            badges: [],
            featured: false,
            reviews: []
          }
        })
      } else {
        throw new Error('Unsupported file format')
      }

      await batchImportAgencies(agencies)
      router.push('/admin/agencies')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during import')
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Import Agencies</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="file" className="block mb-2 font-semibold">
            Choose JSON or CSV file
          </label>
          <input
            type="file"
            id="file"
            accept=".json,.csv"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={!file || importing}
          className="bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 disabled:bg-gray-400"
        >
          {importing ? 'Importing...' : 'Import Agencies'}
        </button>
      </form>
    </div>
  )
}
