import React from 'react'
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



export default function FeeDisplayCard() {
    return (
        <Card className="border hover:border-cardInactive transition-all duration-300 w-full sm:w-96 md:w-[32rem] lg:w-[36rem] xl:w-[40rem] 2xl:w-[44rem]">
            <CardHeader>
                <CardTitle className='text-3xl'>Intent Details</CardTitle>
                <CardDescription className='mb-5 w-4/5'>
                    Here are the details of your crosschain intent. It shows all the details of the intent and the fees associated with it.
                </CardDescription>
                <hr className='border-[0.5px] mt-3 ' />

            </CardHeader>

            <CardContent className='flex flex-col gap-6'>
                <div className='flex justify-between gap-4'>
                    <div className='flex-1 basis-4/12'>
                        <Label>You Send</Label>
                        <div className='rounded-md'>1.5 ETH</div>
                    </div>
                    <div className='flex-1 basis-4/12'>
                        <Label>You Receive</Label>
                        <div className='rounded-md'>1.48 ETH</div>
                    </div>
                    <div className=' border-l basis-1/12 ' />
                    <div className='basis-3/12'>
                        <div>
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className='flex items-center gap-2 hover:text-card-border transition-all duration-300'>
                                            <Label>Total Fee</Label>
                                            <Info className='w-3 h-3' />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className='bg-muted text-muted-foreground'>
                                        <p>This is the total fee for the intent.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <div className='rounded-md'>0.02 ETH</div>
                        </div>
                    </div>
                </div>
                <div className='p-3 rounded-md bg-muted'>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <Label>Fee Breakdown</Label>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div>
                                    <div>
                                        <Label>Fee Breakdown</Label>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div>
                    <Button className="w-full bg-white text-black hover:bg-gray-100">Execute Intent</Button>
                </div>
            </CardContent>
        </Card>
    )
}
