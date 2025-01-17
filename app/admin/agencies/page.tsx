import Link from 'next/link'
import { getAgencies } from '../../../lib/api'

export default async function ManageAgencies() {
  const agencies = await getAgencies()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Agencies</h1>
        <div>
          <Link href="/admin/agencies/new" className="bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 mr-4">
            Add New Agency
          </Link>
          <Link href="/admin/agencies/import" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Import Agencies
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Badges</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {agencies.map((agency) => (
              <tr key={agency.id}>
                <td className="px-6 py-4 whitespace-nowrap">{agency.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{agency.rating}</td>
                <td className="px-6 py-4 whitespace-nowrap">{agency.featured ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {agency.badges.map((badge) => (
                    <span key={badge.type} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                      {badge.text}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/agencies/${agency.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
