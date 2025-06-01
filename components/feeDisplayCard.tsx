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



export default function FeeDisplayCard() {

    const { walletAddress } = useWalletStore();
    const { originChain, destinationChain, inputToken, outputToken, amount, amountWithDecimals, inputTokenSymbol } = useIntentStore();
    const { orderData, fillDeadline, orderDataType, outputAmount, fees } = useIntentGeneration({
        originChain: originChain,
        destinationChain: destinationChain,
        inputToken: inputToken,
        outputToken: outputToken,
        amount: amount,
        amountWithDecimals: amountWithDecimals,
        walletAddress: walletAddress,
    });



    const callTxn = async () => {
        const intentContract = getIntentContract(originChain);


        // Create wallet client for sending transactions
        const walletClient = createWalletClient({
            account: walletAddress as `0x${string}`,
            chain: getChain(originChain),
            transport: custom(window.ethereum),
        });

        console.log("heree:", getChain(originChain).id);
        await walletClient.switchChain({
            id: getChain(originChain).id,
        });



        const tx = await walletClient.writeContract({
            address: intentContract as `0x${string}`,
            abi: AcrossOriginSettlementContractOpenAbi,
            functionName: 'open',
            args: [{
                orderData: orderData,
                fillDeadline: fillDeadline,
                orderDataType: orderDataType,
            }],
        });
    }









    return (
        <Card className="border hover:border-gray-500 transition-all duration-300 w-full sm:w-96 md:w-[32rem] lg:w-[36rem] xl:w-[40rem] 2xl:w-[44rem]">
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
                                                    <div>
                                                        <Label>Order Data: {orderData}</Label>
                                                    </div>
                                                    <div>
                                                        <Label>Fill Deadline: {fillDeadline}</Label>
                                                    </div>
                                                    <div>
                                                        <Label>Order Data Type: {orderDataType}</Label>
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
                            })}>Execute Intent</Button>
                        </div>
                    </CardContent>
                </>
            )}
        </Card>
    )
}
