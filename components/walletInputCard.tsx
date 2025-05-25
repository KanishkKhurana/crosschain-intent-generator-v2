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

type walletInputCardProps = {
  walletAddress: string | undefined;
  connectWallet: () => void;
}

export default function WalletInputCard({ walletAddress, connectWallet }: walletInputCardProps) {
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
                <select className="flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="" disabled selected>Select origin chain</option>
                  <option value="ethereum">Ethereum</option>
                  <option value="polygon">Polygon</option>
                  <option value="arbitrum">Arbitrum</option>
                  <option value="optimism">Optimism</option>
                </select>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Destination Chain</Label>
              <div className='pr-3 border rounded-md border-input hover:border-gray-600 focus-within:border-cardBorder transition-colors'>

                <select className="flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="" disabled selected>Select destination chain</option>
                  <option value="ethereum">Ethereum</option>
                  <option value="polygon">Polygon</option>
                  <option value="arbitrum">Arbitrum</option>
                  <option value="optimism">Optimism</option>
                </select>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Token</Label>
              <div className='pr-3 border rounded-md border-input hover:border-gray-600 focus-within:border-cardBorder transition-colors'>
                <select className="flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="" disabled selected>Select a token</option>
                  <option value="eth">ETH</option>
                  <option value="usdc">USDC</option>
                  <option value="usdt">USDT</option>
                </select>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Amount</Label>
              <Input type='number' className='rounded-md border-input hover:border-gray-600 focus:border-cardBorder focus-visible:ring-0 transition-colors' />
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
