import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useFeatures = create(persist((set) => ({
  features: null,
  setFeatures: (features) =>
    {set((state) => ({...state, features}))
  }
}),
{
  name: 'features-storage', 
},
))