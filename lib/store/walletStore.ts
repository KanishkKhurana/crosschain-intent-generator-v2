import { create } from 'zustand'
import {useConnectWallet} from '@privy-io/react-auth';

interface WalletState {
  walletAddress: string | null
  setWalletAddress: (walletAddress: string | null) => void
}

export const useWalletStore = create<WalletState>((set) => ({
  walletAddress: null,
  setWalletAddress: (walletAddress) => set({ walletAddress }),
})) 