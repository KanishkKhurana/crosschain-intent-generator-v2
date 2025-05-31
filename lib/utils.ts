import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { pad } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildQueryKey<T extends object | undefined>(
  queryName: string,
  params: T,
) {
  if (!params) return [queryName];
  return [queryName, ...Object.entries(params).map((entry) => entry.join("="))];
}

export const padAddress = (address: `0x${string}`) => {
  return pad(address, { size: 32 });
};

export const abiFragment = [
  {
    type: 'tuple',
    components: [
      { name: 'inputToken', type: 'address' },          // Token being sent from source chain
      { name: 'inputAmount', type: 'uint256' },         // Amount to bridge
      { name: 'outputToken', type: 'address' },         // Expected token on destination chain
      { name: 'outputAmount', type: 'uint256' },        // Expected amount on destination chain
      { name: 'destinationChainId', type: 'uint256' },  // Destination chain ID
      { name: 'recipient', type: 'bytes32' },           // Padded recipient address
      { name: 'exclusiveRelayer', type: 'address' },    // Optional relayer address
      { name: 'depositNonce', type: 'uint256' },        // Nonce for replay protection
      { name: 'exclusivityPeriod', type: 'uint32' },    // Period where only `exclusiveRelayer` can fill
      { name: 'message', type: 'bytes' },               // Optional encoded message
    ]
  }
];

export const getTokenDecimals = (inputTokenSymbol?: string) => {
  if(inputTokenSymbol === "USDC" || inputTokenSymbol === "USDT" || inputTokenSymbol === "USDC.e" || inputTokenSymbol === "USDT.e") {
    return 6;
  }
  return 18;
}

