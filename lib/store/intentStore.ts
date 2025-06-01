import { create } from 'zustand'
import {GetSuggestedFeesReturnType} from '@across-protocol/app-sdk'
import { AcrossClient, Route } from "@across-protocol/app-sdk";
import { Address } from 'viem';

export type useAvailableRoutesParams = Parameters<
  AcrossClient["getAvailableRoutes"]
>[0];


interface IntentState {
  originChain: number
  destinationChain: number
  inputToken: Address 
  inputTokenSymbol: string | undefined
  outputToken: Address
  amount: string | bigint 
  amountWithDecimals: bigint
  outputAmount: bigint | undefined
  totalFees: bigint | undefined
  decimals: number | undefined
  routes: Route[] | undefined
  suggestedFees: GetSuggestedFeesReturnType | null
  setOriginChain: (chain: number) => void
  setTotalFees: (fees: bigint | undefined) => void
  setRoutes: (routes: Route[] | undefined) => void
  setDestinationChain: (chain: number) => void
  setInputToken: (token: Address | undefined) => void
  setInputTokenSymbol: (symbol: string | undefined) => void
  setOutputToken: (token: Address | undefined) => void
  setOutputAmount: (amount: bigint | undefined) => void
  setAmount: (amount: number | undefined) => void
  setAmountWithDecimals: (amount: bigint | undefined) => void
  setSuggestedFees: (fees: GetSuggestedFeesReturnType | undefined) => void
}

export const useIntentStore = create<IntentState>((set) => ({
  originChain: 8453,
  destinationChain: 10,
  routes: undefined,
  inputToken: "" as Address,
  inputTokenSymbol: "USDC",
  outputToken: "" as Address,
  amount: "10",
  outputAmount: undefined,
  decimals: undefined,
  amountWithDecimals: BigInt('1000000'),
  suggestedFees: null,
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
  setRoutes: (route) => set({ routes: route }),
}))