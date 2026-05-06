import { createContext, useContext, useState, type ReactNode } from 'react'
import type { User } from '../types'

interface AuthContextValue {
  user: User | null
  login: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function nameFromEmail(email: string): string {
  const local = email.split('@')[0]
  return local
    .split(/[._-]/)
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ')
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  function login(email: string) {
    setUser({ email, name: nameFromEmail(email) })
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
