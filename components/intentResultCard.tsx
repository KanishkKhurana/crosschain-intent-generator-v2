'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Minus, MoveRight } from 'lucide-react'
import Image from 'next/image'
import { useDepositStatus } from '@/lib/hooks/useDepositStatus';
import { useIntentStore } from '@/lib/store/intentStore';
export default function IntentResultCard() {
    const { depositTxHash } = useIntentStore();
    const { depositStatus } = useDepositStatus(depositTxHash);
    return (
        <div>
            <Card className='border hover:border-gray-500 transition-all duration-300 w-full sm:w-96 md:w-[32rem] lg:w-[36rem] xl:w-[40rem] 2xl:w-[44rem]'>
                <CardHeader>
                    <CardTitle className='text-3xl '>Intent Execution Result</CardTitle>
                    <CardDescription className='mb-5 w-4/5'>Congratulations! Your intent has been executed successfully. Here are the details of the intent execution.</CardDescription>
                    <hr className='border-[0.5px] mt-3' />
                </CardHeader>
                <CardContent className='flex'>
                    <div className='flex justify-around w-full'>
                        <div className=''>
                            <div className='w-20  h-20 bg-green-500 rounded-full rotate-x-15 -rotate-y-30'/>
                        </div>
                        <div className='flex justify-center gap-0 relative items-center w-full mx-5'>
                            <div className='mb-10'>dv</div>
                            <div className='mt-10'>dv</div>
                            <div className='absolute w-full h-[1px] bg-white/20' />
                            <div className='absolute w-4 h-4 border-t border-r border-white/20 rotate-45 right-0 top-1/2 -translate-y-1/2' />
                        </div>
                        <div className='relative'>
                            <div className='w-20  h-20 bg-green-500 rounded-full rotate-x-15 -rotate-y-30'/>
                        </div>
                    </div>
                </CardContent>
                    <div>
                        <Label>Deposit Status {depositStatus?.status}</Label>
                    </div>
            </Card>
        </div>
    )
}

// {
//     "status": "filled",
//     "originChainId": 8453,
//     "depositId": "3887325",
//     "depositTxHash": "0x487bbac1598d6fdb80d5258e9f1ec227bbe3e5684032e831037f30a19e33e69c",
//     "fillTx": "0x03b50c26d8cab6817791e56f29b0708ee234e09cd707647f07c8281bbbd86ae1",
//     "destinationChainId": 42161,
//     "depositRefundTxHash": null,
//     "pagination": {
//       "currentIndex": 0,
//       "maxIndex": 0
//     }
//   }