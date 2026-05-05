import React, { createContext, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'tr_user'
const AuthContext = createContext(null)

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser())

  function login(profile) {
    const next = {
      email: profile.email,
      name: profile.name || profile.email.split('@')[0],
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setUser(next)
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  const value = useMemo(() => ({
    user,
    login,
    logout,
    isAuthenticated: Boolean(user),
    isLoadingAuth: false,
    isLoadingPublicSettings: false,
    authError: null,
    authChecked: true,
    navigateToLogin: () => {},
    checkUserAuth: () => {},
    checkAppState: () => {},
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}