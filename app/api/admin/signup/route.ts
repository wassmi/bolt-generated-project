import { NextResponse } from 'next/server'
import { users } from '@/lib/users'

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Check if user already exists
    if (users.has(email)) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // Create new user
    users.set(email, {
      id: String(users.size + 1),
      name,
      email,
      password, // In a real app, this would be hashed
    })

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'An error occurred during signup' }, { status: 500 })
  }
}
