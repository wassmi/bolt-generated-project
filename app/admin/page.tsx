import { getAgencies } from '../../lib/api'

export default async function AdminDashboard() {
  const agencies = await getAgencies()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Agencies</h2>
          <p className="text-3xl font-bold text-rose-600">{agencies.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Featured Agencies</h2>
          <p className="text-3xl font-bold text-rose-600">{agencies.filter(a => a.featured).length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Top Rated Agencies</h2>
          <p className="text-3xl font-bold text-rose-600">{agencies.filter(a => a.rating >= 4.5).length}</p>
        </div>
      </div>
    </div>
  )
}
