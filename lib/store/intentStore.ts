import { create } from 'zustand'
import {GetSuggestedFeesReturnType} from '@across-protocol/app-sdk'

interface IntentState {
  originChain: number | undefined
  destinationChain: number | undefined
  inputToken: `0x${string}` | undefined
  inputTokenSymbol: string | undefined
  outputToken: `0x${string}` | undefined
  amount: string | bigint
  amountWithDecimals: bigint | undefined
  outputAmount: bigint | undefined
  totalFees: bigint | undefined
  decimals: number | undefined
  suggestedFees: GetSuggestedFeesReturnType | undefined
  setOriginChain: (chain: number | undefined) => void
  setTotalFees: (fees: bigint | undefined) => void
  setDestinationChain: (chain: number | undefined) => void
  setInputToken: (token: `0x${string}` | undefined) => void
  setInputTokenSymbol: (symbol: string | undefined) => void
  setOutputToken: (token: `0x${string}` | undefined) => void
  setOutputAmount: (amount: bigint | undefined) => void
  setAmount: (amount: number | undefined) => void
  setAmountWithDecimals: (amount: bigint | undefined) => void
  setSuggestedFees: (fees: GetSuggestedFeesReturnType | undefined) => void
}

export const useIntentStore = create<IntentState>((set) => ({
  originChain: 8453,
  destinationChain: 10,
  inputToken: undefined,
  inputTokenSymbol: undefined,
  outputToken: undefined,
  amount: '10' ,
  outputAmount: undefined,
  decimals: undefined,
  amountWithDecimals: undefined,
  suggestedFees: undefined,
  totalFees: undefined,
  setOriginChain: (chain) => set({ originChain: chain }),
  setTotalFees: (fees) => set({ totalFees: fees }),
  setAmountWithDecimals: (amount) => set({ amountWithDecimals: amount }),
  setDestinationChain: (chain) => set({ destinationChain: chain }),
  setInputToken: (token) => set({ inputToken: token }),
  setInputTokenSymbol: (symbol) => set({ inputTokenSymbol: symbol }),
  setOutputAmount: (amount) => set({ outputAmount: amount }),
  setOutputToken: (token) => set({ outputToken: token }),
  setAmount: (amount) => set({ amount: amount?.toString() }),
  setSuggestedFees: (fees) => set({ suggestedFees: fees }),
}))