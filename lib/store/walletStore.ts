import { create } from 'zustand'

interface WalletState {
  walletAddress: `0x${string}` | null
  setWalletAddress: (walletAddress: `0x${string}` | null) => void
}

export const useWalletStore = create<WalletState>((set) => ({
  walletAddress: null,
  setWalletAddress: (walletAddress) => set({ walletAddress }),
})) 