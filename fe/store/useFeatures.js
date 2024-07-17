import { create } from 'zustand'

export const useFeatures = create((set) => ({
  features: null,
  setFeatures: (features) =>
    {set((state) => ({...state, features}))
  }
}))