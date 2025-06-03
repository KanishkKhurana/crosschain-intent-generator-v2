"use client"
import React, { useEffect, useState } from 'react'
import { createWalletClient, http, custom, formatUnits } from 'viem'
import { base } from 'viem/chains'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from '@radix-ui/react-label'
import { Info } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from './ui/button'
import { useIntentGeneration } from '@/lib/hooks/useIntentGeneration'
import { useWalletStore } from '@/lib/store/walletStore'
import { executeTransaction } from '@/lib/services/transaction-service'
import { useIntentStore } from '@/lib/store'
import { useWriteContract } from 'wagmi'
import { AcrossOriginSettlementContractOpenAbi, getChain, getIntentContract, getTokenDecimals } from '@/lib/utils'
import { getChainId } from 'viem/actions'
import { useStepStore } from '@/lib/store/stepStore'



export default function FeeDisplayCard() {

    const { walletAddress } = useWalletStore();
    const { originChain, destinationChain, inputToken, outputToken, amount, amountWithDecimals, inputTokenSymbol, setDepositTxHash } = useIntentStore();
    const { orderData, fillDeadline, orderDataType, outputAmount, fees } = useIntentGeneration({
        originChain: originChain,
        destinationChain: destinationChain,
        inputToken: inputToken,
        outputToken: outputToken,
        amount: amount,
        amountWithDecimals: amountWithDecimals,
        walletAddress: walletAddress,
    });

    return (
        <div className='flex h-full gap-2'>
            <div className='flex flex-col w-full items-center basis-1/12 relative'>
        <div className={`${useStepStore().step >= 2 ? ' bg-[#6cf9d8]' : ' bg-gray-500'} text-black transition-all relative z-10 duration-300 rounded-full w-10 h-10 flex items-center justify-center`}>
          2
        </div>
        <div className={`w-full h-full flex flex-col border-l  absolute top-0 left-1/2 z-0 ${useStepStore().step >= 3 ? 'border-[#6cf9d8]' : 'border-gray-500'} transition-all duration-300`}>
        </div>
      </div>

        <Card className="border hover:border-gray-500 transition-all duration-300 w-full sm:w-96 md:w-[32rem] lg:w-[36rem] xl:w-[40rem] 2xl:w-[44rem] mb-12">
            <CardHeader>
                <CardTitle className='text-3xl'>Intent Details</CardTitle>
                <CardDescription className='mb-5 w-4/5'>
                    Here are the details of your crosschain intent. It shows all the details of the intent and the fees associated with it.
                </CardDescription>

            </CardHeader>

            {outputAmount && fees && orderData !== undefined && (
                <>
                <hr className='border-[0.5px] mb-3 mx-3 ' />


                    <CardContent className='flex flex-col gap-6'>
                        <div className='flex justify-between gap-4'>
                            <div className='flex-1 basis-4/12'>
                                <Label className='text-sm'>You Send</Label>
                                <div className='rounded-md'>{formatUnits(amountWithDecimals, getTokenDecimals(inputTokenSymbol))} {inputTokenSymbol}</div>
                            </div>
                            <div className='flex-1 basis-4/12'>
                                <Label className='text-sm'>You Receive</Label>
                                <div className='rounded-md'>{formatUnits(outputAmount, getTokenDecimals(inputTokenSymbol))} {inputTokenSymbol}</div>
                            </div>
                            <div className=' border-l basis-1/12 ' />
                            <div className='basis-3/12'>
                                <div>
                                    <TooltipProvider delayDuration={0}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className='flex items-center gap-2 hover:text-card-border transition-all duration-300'>
                                                    <Label className='text-sm'>Total Fee</Label>
                                                    <Info className='w-3 h-3' />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent className='bg-muted text-muted-foreground'>
                                                <p>This is the total fee for the intent.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <div className='rounded-md'>{formatUnits(fees, getTokenDecimals(inputTokenSymbol))} {inputTokenSymbol}</div>
                                </div>
                            </div>
                        </div>
                        <div className='p-3 rounded-md bg-muted no-underline'>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1" className='no-underline'>
                                    <AccordionTrigger className='no-underline'>
                                        <Label className='no-underline'>Intent Breakdown</Label>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div>
                                            {orderData && (
                                                <>
                                                    <div className="mb-4">
                                                        <Label>Order Data:</Label>
                                                        <div className="bg-gray-800 text-white p-2 rounded-md flex justify-between items-center">
                                                            <span className="break-all">{orderData}</span>
                                                            <button onClick={() => navigator.clipboard.writeText(orderData)} className="ml-2 text-blue-500">Copy</button>
                                                        </div>
                                                    </div>
                                                    <div className="mb-4">
                                                        <Label>Fill Deadline:</Label>
                                                        <div className="bg-gray-800 text-white p-2 rounded-md flex justify-between items-center">
                                                            <span className="break-all">{fillDeadline}</span>
                                                            <button onClick={() => navigator.clipboard.writeText(fillDeadline.toString())} className="ml-2 text-blue-500">Copy</button>
                                                        </div>
                                                    </div>
                                                    <div className="mb-4">
                                                        <Label>Order Data Type:</Label>
                                                        <div className="bg-gray-800 text-white p-2 rounded-md flex justify-between items-center">
                                                            <span className="break-all">{orderDataType}</span>
                                                            <button onClick={() => navigator.clipboard.writeText(orderDataType)} className="ml-2 text-blue-500">Copy</button>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                        <div>
                            <Button className="w-full bg-white text-black hover:bg-gray-100" onClick={() => executeTransaction({
                                orderData: orderData,
                                fillDeadline: fillDeadline,
                                orderDataType: orderDataType,
                                originChain: originChain,
                                walletAddress: walletAddress,
                                inputToken: inputToken,
                                inputTokenSymbol: inputTokenSymbol,
                                setDepositTxHash: setDepositTxHash,
                            })}>Execute Intent</Button>
                        </div>
                    </CardContent>
                </>
            )}
        </Card>
        </div>
    )
}
