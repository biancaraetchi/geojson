import { create } from 'zustand'

export const useAuth = create((set) => ({
  accessToken: null,
  refreshToken: null,
  setAccessToken: (accessToken) => set((state) => ({...state, accessToken })),
  setRefreshToken: (refreshToken) => set((state) => ({...state, refreshToken }))
}))