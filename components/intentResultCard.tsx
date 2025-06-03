'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useDepositStatus } from '@/lib/hooks/useDepositStatus';
import { useIntentStore } from '@/lib/store/intentStore';
import { useStepStore } from '@/lib/store/stepStore'
import { CheckCircle2 } from 'lucide-react'
export default function IntentResultCard() {
    const { depositTxHash, fillTime, inputTokenSymbol, loading, amount } = useIntentStore();
    const { depositStatus, originChainImage, destinationChainImage, originChainScan, destinationChainScan } = useDepositStatus(depositTxHash);
    return (
        <div className='flex h-full gap-2'>
            <div className='flex flex-col w-full items-center jusify-between basis-1/12 relative'>
                <div className={`${useStepStore().step >= 3 ? ' bg-[#6cf9d8]' : ' bg-gray-500'} text-black transition-all relative z-10 duration-300 rounded-full w-10 h-10 flex items-center justify-center`}>
                    3
                </div>
                <div className={`w-full h-full flex flex-col border-l  absolute top-0 left-1/2 z-0 ${useStepStore().step === 4 ? 'border-[#6cf9d8]' : 'border-gray-500'} transition-all  duration-300`}>
                </div>
                <div className={`${useStepStore().step === 4 ? ' bg-[#6cf9d8]' : ' bg-gray-500'} text-black transition-all absolute bottom-0 z-10 duration-300 rounded-full w-10 h-10 flex items-center justify-center`}>
                    <CheckCircle2 className='w-5 h-5' />
                </div>

            </div>
            <Card className='bg-[#34353a] transition-all duration-300 w-full sm:w-96 md:w-[32rem] lg:w-[36rem] xl:w-[40rem] 2xl:w-[44rem] mb-12 shadow-mb'>
                <CardHeader>
                    <CardTitle className='text-3xl '>Intent Execution Result</CardTitle>
                    <CardDescription className='mb-5 w-4/5'>Congratulations! Your intent has been executed successfully. Here are the details of the intent execution.</CardDescription>
                    <hr className='border-[0.5px] mt-3' />
                </CardHeader>
                {loading && (
                    <div className='flex flex-col gap-2 items-center justify-center p-5'>
                    <Loader2 className='w-10 h-10 animate-spin' />
                    <p>Waiting for intent to be filled...</p>
                    </div>
                )}
                {depositStatus?.status === "filled" && (
                    <>
                <CardContent className='flex'>
                    
                    <div className='flex justify-around w-full'>
                        <div className=''>
                            <Link href={originChainScan || ""} target='_blank' className='cursor-pointer'>
                            <Image src={String(originChainImage)} alt="success" width={100} height={100} />
                            </Link>
                        </div>
                        <div className='flex text-center justify-center gap-0 relative items-center w-full mx-5'>
                            <div className='flex flex-col gap-2'>

                            <div className=' left-0'>Intent filled in {fillTime} Seconds 🎉</div>
                            <div className='right-0'>{amount} {inputTokenSymbol}</div>
                            </div>
                            <div className='absolute w-full h-[1px] bg-white/20' />
                            <div className='absolute w-4 h-4 border-t border-r border-white/20 rotate-45 right-0 top-1/2 -translate-y-1/2' />
                        </div>
                        <div className='relative'>
                            <Link href={destinationChainScan || ""} target='_blank' className='cursor-pointer'>
                            <Image src={String(destinationChainImage)} alt="success" width={100} height={100} />
                            </Link>
                        </div>
                    </div>
                </CardContent>
                {/* <div className='flex flex-col gap-2'>
                    <Label>Deposit Status {depositStatus?.status}</Label>
                    <Label>Deposit ID {depositStatus?.depositId}</Label>
                    <Label>Deposit Tx Hash {originChainScan}</Label>
                    <Label>Fill Tx {destinationChainScan}</Label>
                </div> */}
                    </>
                )}
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