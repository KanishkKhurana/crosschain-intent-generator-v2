"use client"
import React from 'react'
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
import { useAvailableRoutes } from "@/lib/hooks/useAvailableRoutes"
import { useConnectWallet } from '@privy-io/react-auth';
import { useWalletStore } from "@/lib/store/walletStore";
import { useSuggestedFees } from "@/lib/hooks/useSuggestedFees";



export default function WalletInputCard() {
  const { originChain, destinationChain, amount, inputToken, outputToken, setInputToken, setOutputToken } = useIntentStore();
  const { walletAddress, setWalletAddress } = useWalletStore();
  const { connectWallet } = useConnectWallet({
    onSuccess: ({ wallet }) => {
      console.log("wallet:", wallet);
      setWalletAddress(wallet.address);
    },
  });
  const { availableRoutes } = useAvailableRoutes({
    originChainId: originChain,
    destinationChainId: destinationChain
  });
  // const suggestedFees = useSuggestedFees();

  return (
    <div>
      <Card className="border hover:border-cardInactive transition-all duration-300 w-full sm:w-96 md:w-[32rem] lg:w-[36rem] xl:w-[40rem] 2xl:w-[44rem]">
        <CardHeader>
          <CardTitle className='text-3xl '>Configure Intent Parameters</CardTitle>
          <CardDescription className='mb-5 w-4/5'>Define the origin and destination chain, amount and connect your wallet to initiate a crosschain intent</CardDescription>
          <hr className='border-[0.5px] mt-3' />
        </CardHeader>
        <CardContent className='flex flex-col gap-6'>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label>
                {walletAddress ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    Wallet Connected
                  </div>
                ) : (
                  "Connect Wallet"
                )}
              </Label>
            </div>
            <Button onClick={connectWallet}>
              {walletAddress ? walletAddress : "Click here to connect your wallet"}
            </Button>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <Label>Origin Chain</Label>
              <div className='pr-3 border rounded-md border-input hover:border-gray-600 focus-within:border-cardBorder transition-colors'>
                <select
                  className="flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  value={useIntentStore().originChain || ""}
                  onChange={(e) => {
                    const value = e.target.value ? Number(e.target.value) : undefined;
                    useIntentStore.getState().setOriginChain(value);
                    // If destination chain matches new origin, clear it
                    if (useIntentStore.getState().destinationChain === value) {
                      useIntentStore.getState().setDestinationChain(undefined);
                    }
                    console.log("origin chain", useIntentStore.getState().originChain);
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
                    const value = e.target.value ? Number(e.target.value) : undefined;
                    useIntentStore.getState().setDestinationChain(value);
                    // If origin chain matches new destination, clear it
                    if (useIntentStore.getState().originChain === value) {
                      useIntentStore.getState().setOriginChain(undefined);
                    }
                    console.log("destination chain", useIntentStore.getState().destinationChain);
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
                    useIntentStore.getState().setInputToken(value as `0x${string}`);
                    // Find the selected route and set the output token
                    const selectedRoute = availableRoutes?.find(route => route.inputToken === value);
                    if (selectedRoute) {
                      useIntentStore.getState().setOutputToken(selectedRoute.outputToken);
                      if (selectedRoute.inputTokenSymbol) {
                        useIntentStore.getState().setInputTokenSymbol(selectedRoute.inputTokenSymbol);
                        console.log("input token symbol:", selectedRoute.inputTokenSymbol);
                      }
                    }
                    console.log("input token:", value);
                    console.log("output token:", selectedRoute?.outputToken);
                  }}
                >
                  <option value="" disabled>Select a token</option>
                  {availableRoutes?.map((route) => (
                    <option key={route.inputToken} value={route.inputToken}>
                      {route.inputTokenSymbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Amount</Label>
              <Input type='number' className='rounded-md border-input hover:border-gray-600 focus:border-cardBorder focus-visible:ring-0 transition-colors' onChange={(e) => {
                const value = e.target.value ? Number(e.target.value) : undefined;
                useIntentStore.getState().setAmount(value);
              }} value={useIntentStore().amount.toString()} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className='w-full'>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
