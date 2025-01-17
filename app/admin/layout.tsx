import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth/next"
import { signOut } from 'next-auth/react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-rose-600">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <Link href="/admin" className="block py-2 px-4 hover:bg-gray-100">Dashboard</Link>
          <Link href="/admin/agencies" className="block py-2 px-4 hover:bg-gray-100">Manage Agencies</Link>
        </nav>
        <form action={async () => {
          'use server'
          await signOut({ redirect: false })
          redirect('/admin/login')
        }} className="mt-auto p-4">
          <button type="submit" className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300">
            Logout
          </button>
        </form>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
