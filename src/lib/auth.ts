// import { create } from 'zustand'

// interface User {
//   id: string
//   email: string
//   name?: string
// }

// interface AuthState {
//   user: User | null
//   isAuthenticated: boolean
//   setUser: (user: User | null) => void
// }

// export const useAuth = create<AuthState>((set) => ({
//   user: null,
//   isAuthenticated: false,
//   setUser: (user) => set({ user, isAuthenticated: !!user }),
// }))
