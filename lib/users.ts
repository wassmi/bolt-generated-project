interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// In-memory store for users
const users = new Map<string, User>();

// Add a default admin user
users.set('admin@example.com', {
  id: '1',
  name: 'Admin',
  email: 'admin@example.com',
  // In a real app, this would be hashed
  password: 'admin123',
});

export { users };
export type { User };
