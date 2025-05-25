import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'

export default function IntentResultCard() {
    return (
        <div>
            <Card className='border hover:border-cardInactive transition-all duration-300 w-full sm:w-96 md:w-[32rem] lg:w-[36rem] xl:w-[40rem] 2xl:w-[44rem]'>
                <CardHeader>
                    <CardTitle className='text-3xl '>Intent Execution Result</CardTitle>
                    <CardDescription className='mb-5 w-4/5'>Congratulations! Your intent has been executed successfully. Here are the details of the intent execution.</CardDescription>
                    <hr className='border-[0.5px] mt-3' />
                </CardHeader>
                <CardContent className='grid grid-cols-3 gap-4'>
                    <div className='col-span-1'>
                        
                    </div>
                    <div className='col-span-1'>                        
                    </div>
                </CardContent>
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