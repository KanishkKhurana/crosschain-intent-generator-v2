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
import { useConnectWallet } from '@privy-io/react-auth';
import { useWalletStore } from "@/lib/store/walletStore";
import { Address } from 'viem'
import { useAvailableRoutes } from "@/lib/hooks/useAvailableRoutes"
import { useStepStore } from '@/lib/store/stepStore'



export default function WalletInputCard() {
  const { originChain, destinationChain } = useIntentStore();
  const { walletAddress, setWalletAddress } = useWalletStore();
  const { connectWallet } = useConnectWallet({
    onSuccess: ({ wallet }) => {
      setWalletAddress(wallet.address as `0x${string}`);
      useStepStore.getState().setStep(2);
    },
  });

  const { availableRoutes } = useAvailableRoutes({
    originChainId: originChain ?? 8453,
    destinationChainId: destinationChain ?? 10
  });


  return (
    <div className='flex h-full gap-2'>
      <div className='flex flex-col w-full items-center basis-1/12 relative'>
        <div className={`${useStepStore().step >= 1 ? ' bg-[#6cf9d8]' : ' bg-gray-500'} text-black transition-all relative z-10 duration-300 rounded-full w-10 h-10 flex items-center justify-center`}>
          1
        </div>
        <div className={`w-full h-full flex flex-col border-l  absolute top-0 left-1/2 z-0 ${useStepStore().step >= 2 ? 'border-[#6cf9d8]' : 'border-gray-500'} transition-all duration-300`}>
        </div>
      </div>
      <Card className=" bg-[#34353a] transition-all duration-300 sm:w-96 md:w-[32rem] lg:w-[36rem] xl:w-[40rem] 2xl:w-[44rem] mb-12 basis-11/12 shadow-mb">
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
              <div className='pr-3  rounded-md border-input hover:border-gray-600 bg-[#2d2f32] transition-colors'>
                <select
                  className="flex h-10 w-full rounded-md bg-[#2d2f32] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  value={useIntentStore().originChain || ""}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    useIntentStore.getState().setOriginChain(value);
                    // If destination chain matches new origin, clear it

                  }}
                >
                  <option value="" disabled>Select origin chain</option>
                  {contractConfig.filter(chain => chain.chainId !== destinationChain).map((chain) => (
                    <option key={chain.chainId} value={chain.chainId}>
                      <div className='flex items-center gap-2'>
                         {chain.name}
                      </div>
                    </option>
                  ))
                  }
                </select>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Destination Chain</Label>
              <div className='pr-3 rounded-md border-input hover:border-gray-600 bg-[#2d2f32] transition-colors'>
                <select
                  className="flex h-10 w-full rounded-md bg-[#2d2f32] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  value={useIntentStore((state) => state.destinationChain) || ""}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    useIntentStore.getState().setDestinationChain(value);
                    // If origin chain matches new destination, clear it

                  }}
                >
                  <option value="" disabled>Select destination chain</option>
                  {contractConfig.filter(chain => chain.chainId !== originChain).map((chain) => (
                    <option key={chain.chainId} value={chain.chainId}>
                      <div className='flex items-center gap-2'>
                        {chain.name}
                      </div>
                    </option>
                  ))
                  }
                </select>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Token</Label>
              <div className='pr-3 rounded-md border-input hover:border-gray-600 bg-[#2d2f32] transition-colors'>
                <select
                  className="flex h-10 w-full rounded-md bg-[#2d2f32] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  value={useIntentStore().inputToken || ""}
                  onChange={(e) => {
                    const value = e.target.value || undefined;
                    useIntentStore.getState().setInputToken(value as Address);
                    // Find the selected route and set the output token and symbol
                    const selectedRoute = availableRoutes?.find(route => route.inputToken === value);
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
                  {availableRoutes?.map((route) => (
                    <option value={route.inputToken} key={route.outputToken}>
                      {route.inputTokenSymbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Amount</Label>
              <Input pattern="^\d*(\.\d{0,2})?$" step={0.1} className='rounded-md bg-[#2d2f32] focus-visible:ring-0 border-none' onChange={(e) => {
                const value = e.target.value ? Number(e.target.value) : undefined;
                useIntentStore.getState().setAmount(value);
              }} value={useIntentStore().amount?.toString() || '0'} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className='w-full'>
            <Button className='w-full bg-[#6cf9d8] text-black hover:scale-105 transition-all duration-300 hover:bg-[#6cf9d8]' onClick={connectWallet}>
              {walletAddress ? walletAddress : "Connect Wallet to Build Intent"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
