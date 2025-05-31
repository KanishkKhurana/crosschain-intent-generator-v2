import { createWalletClient, http, createPublicClient } from 'viem';
import { abiFragment, padAddress } from '../utils';
import { useIntentStore, useWalletStore } from '../store';
import { useSuggestedFees } from './useSuggestedFees';

export const useIntentGeneration = () => {
  const { originChain, destinationChain, inputToken, outputToken, amount } = useIntentStore();
  const { walletAddress } = useWalletStore();
//   const suggestedFees = useSuggestedFees();




  
}