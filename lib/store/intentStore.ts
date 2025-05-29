import { create } from 'zustand'

interface IntentState {
  originChain: string | null
  destinationChain: string | null
  token: string | null
  amount: string | null
  setOriginChain: (chain: string | null) => void
  setDestinationChain: (chain: string | null) => void
  setToken: (token: string | null) => void
  setAmount: (amount: string | null) => void
}

export const useIntentStore = create<IntentState>((set) => ({
  originChain: null,
  destinationChain: null,
  token: null,
  amount: null,
  setOriginChain: (chain) => set({ originChain: chain }),
  setDestinationChain: (chain) => set({ destinationChain: chain }),
  setToken: (token) => set({ token }),
  setAmount: (amount) => set({ amount }),
})) 