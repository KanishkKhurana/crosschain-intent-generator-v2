"use client"
import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { contractConfig } from "@/lib/contractDetails"
import { useIntentStore } from "@/lib/store"
import { useConnectWallet } from '@privy-io/react-auth';
import { useWalletStore } from "@/lib/store/walletStore";
import { Address } from 'viem'
import { useAvailableRoutes } from "@/lib/hooks/useAvailableRoutes"
import { useSuggestedFees } from '@/lib/hooks/useSuggestedFees'
import { useIntentGeneration } from '@/lib/hooks/useIntentGeneration'


export default function WalletInputCard() {
  const { routes, originChain, destinationChain, amount, inputToken, outputToken, setInputToken, setOutputToken, inputTokenSymbol, setInputTokenSymbol } = useIntentStore();
  const { walletAddress, setWalletAddress } = useWalletStore();
  const { connectWallet } = useConnectWallet({
    onSuccess: ({ wallet }) => {
      setWalletAddress(wallet.address as `0x${string}`);
    },
  });

  const { availableRoutes } = useAvailableRoutes({
    originChainId: originChain ?? 8453,
    destinationChainId: destinationChain ?? 10
  });

  // console.log("inputToken:", inputToken);
  // console.log("outputToken:", outputToken);
  // console.log("inputTokenSymbol:", inputTokenSymbol);
  // console.log("walletAddress:", walletAddress);
  // console.log("originChain:", originChain);
  // console.log("destinationChain:", destinationChain);
  // console.log("amount:", amount);
  // console.log("inputToken:", inputToken);
  // console.log("outputToken:", outputToken);
  // console.log("inputTokenSymbol:", inputTokenSymbol);
  // console.log("routes:", routes);



  return (
    <div>
      <Card className="border hover:border-gray-500 transition-all duration-300 w-full sm:w-96 md:w-[32rem] lg:w-[36rem] xl:w-[40rem] 2xl:w-[44rem]">
        <CardHeader>
          <CardTitle className='text-3xl '>Configure Intent Parameters</CardTitle>
          <CardDescription className='mb-5 w-4/5'>Define the origin and destination chain, amount and connect your wallet to initiate a crosschain intent</CardDescription>
          <hr className='border-[0.5px] mt-3' />
        </CardHeader>
        <CardContent className='flex flex-col gap-6'>
          {walletAddress && (
            <Label>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Wallet Connected
              </div>
            </Label>
          )}
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <Label>Origin Chain</Label>
              <div className='pr-3 border rounded-md border-input hover:border-gray-600 focus-within:border-cardBorder transition-colors'>
                <select
                  className="flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  value={useIntentStore().originChain || ""}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    useIntentStore.getState().setOriginChain(value);
                    // If destination chain matches new origin, clear it
                  
                  }}
                >
                  <option value="" disabled>Select origin chain</option>
                  {contractConfig.filter(chain => chain.chainId !== useIntentStore().destinationChain).map((chain) => (
                    <option key={chain.chainId} value={chain.chainId}>
                      {chain.name}
                    </option>
                  ))
                  }
                </select>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Destination Chain</Label>
              <div className='pr-3 border rounded-md border-input hover:border-gray-600 focus-within:border-cardBorder transition-colors'>
                <select
                  className="flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  value={useIntentStore((state) => state.destinationChain) || ""}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    useIntentStore.getState().setDestinationChain(value);
                    // If origin chain matches new destination, clear it
 
                  }}
                >
                  <option value="" disabled>Select destination chain</option>
                  {contractConfig.filter(chain => chain.chainId !== useIntentStore().originChain).map((chain) => (
                    <option key={chain.chainId} value={chain.chainId}>
                      {chain.name}
                    </option>
                  ))
                  }
                </select>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Token</Label>
              <div className='pr-3 border rounded-md border-input hover:border-gray-600 focus-within:border-cardBorder transition-colors'>
                <select
                  className="flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  value={useIntentStore().inputToken || ""}
                  onChange={(e) => {
                    const value = e.target.value || undefined;
                    useIntentStore.getState().setInputToken(value as Address);
                    // Find the selected route and set the output token and symbol
                    const selectedRoute = routes?.find(route => route.inputToken === value);
                    if (selectedRoute) {
                      useIntentStore.getState().setOutputToken(selectedRoute.outputToken);
                      // Always set the symbol, fallback to 'USDC' if missing
                      useIntentStore.getState().setInputTokenSymbol(selectedRoute.inputTokenSymbol || "USDC");
                    } else {
                      // Fallback: clear symbol if no route found
                      useIntentStore.getState().setInputTokenSymbol(undefined);
                    }

                  }}
                >
                  <option value="" disabled>Select a token</option>
                  {routes?.map((route) => (
                    <option value={route.inputToken}>
                      {route.inputTokenSymbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Amount</Label>
              <Input pattern="^\d*(\.\d{0,2})?$" step={0.1} className='rounded-md border-input hover:border-gray-600 focus:border-cardBorder focus-visible:ring-0 transition-colors' onChange={(e) => {
                const value = e.target.value ? Number(e.target.value) : undefined;
                useIntentStore.getState().setAmount(value);
              }} value={useIntentStore().amount?.toString() || '0'} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className='w-full'>
            <Button className='w-full' onClick={connectWallet}>
              {walletAddress ? walletAddress : "Connect Wallet to Build Intent"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
