export interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  token? : string;
  // add other user fields
}

export function validateUser(email: string, password: string): User | null {
  const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  return users.find((user) => user.email === email && user.password === password) || null;
}

export function generateToken() {
  return Math.random().toString(36).substr(2);
}
