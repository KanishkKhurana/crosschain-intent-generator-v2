import { Address, encodeAbiParameters } from 'viem';
import { abiFragment, padAddress } from '../utils';
import { useSuggestedFees } from './useSuggestedFees';


export const useIntentGeneration = ({
  originChain,
  destinationChain,
  inputToken,
  outputToken,
  amount,
  amountWithDecimals,
  walletAddress
}: {
  originChain: number;
  destinationChain: number;
  inputToken: `0x${string}`;
  outputToken: `0x${string}`;
  amount: string | bigint;
  amountWithDecimals: bigint;
  walletAddress: `0x${string}` | null;
}) => {


  // if (!walletAddress || !originChain || !destinationChain || !inputToken || !outputToken || !amount || !amountWithDecimals) {
  //   return {
  //     orderData: "undefined",
  //     fillDeadline: "undefined",
  //     orderDataType: "undefined"
  //   }
  // }



  // Ensure useSuggestedFees is called unconditionally
  const { suggestedFees } = useSuggestedFees({
    originChainId: originChain ?? 0,
    destinationChainId: destinationChain ?? 0,
    inputToken: inputToken,
    amount: amount,
    outputToken: outputToken
  });



  const currentTimestamp = Math.floor(Date.now() / 1000);
  const fillDeadline = currentTimestamp + (30 * 60);

  const orderDataType = "0x9df4b782e7bbc178b3b93bfe8aafb909e84e39484d7f3c59f400f1b4691f85e2";



  let orderData: `0x${string}` | undefined;
  if (walletAddress && originChain && destinationChain && inputToken && outputToken && amountWithDecimals && suggestedFees?.outputAmount) {
    // Log all values in a table before encoding
    console.table([
      {
        inputToken: inputToken as Address,
        inputAmount: Number(amountWithDecimals),
        outputToken: outputToken as Address,
        outputAmount: Number(suggestedFees?.outputAmount),
        destinationChain,
        recipient: padAddress(walletAddress),
        exclusiveRelayer: '0x0000000000000000000000000000000000000000',
        depositNonce: 0,
        exclusivityPeriod: 0,
        message: '0x'
      }
    ]);
    orderData = encodeAbiParameters(abiFragment, [[
      inputToken as Address,
      Number(amountWithDecimals),
      outputToken as Address,
      Number(suggestedFees?.outputAmount),
      destinationChain,
      padAddress(walletAddress),
      '0x0000000000000000000000000000000000000000', // no exclusive relayer
      0, // nonce
      0, // exclusivity period
      '0x' // empty message
    ]]);
  }
  
    console.log("orderData:", orderData);
    console.log("fillDeadline:", fillDeadline);
    console.log("orderDataType:", orderDataType);
    console.log("outputAmount:", suggestedFees?.outputAmount);
    console.log("fees:", suggestedFees?.totalRelayFee.total);

  return {
    orderData,
    fillDeadline,
    orderDataType,
    outputAmount: suggestedFees?.outputAmount,
    fees: suggestedFees?.totalRelayFee.total,
  }
  }
