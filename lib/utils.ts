import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { pad } from "viem";
import { contractConfig } from "./contractDetails";
import { base, arbitrum, optimism } from "viem/chains";

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
  if (address) {
    return pad(address, { size: 32 });
  }
  return undefined;
};

export const AcrossOriginSettlementContractOpenAbi = [
  {
    type: 'function',
    name: 'open',
    stateMutability: 'nonpayable',
    inputs: [
      {
        components: [
          { internalType: "uint32", name: "fillDeadline", type: "uint32" },
          { internalType: "bytes32", name: "orderDataType", type: "bytes32" },
          { internalType: "bytes", name: "orderData", type: "bytes" },
        ],
        internalType: "struct OnchainCrossChainOrder",
        name: "order",
        type: "tuple",
      },
    ],
    outputs: [],
  }
];

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
  // Return 6 for stablecoins, 18 for ETH/other tokens
  if (
    inputTokenSymbol === "USDC" ||
    inputTokenSymbol === "USDT" ||
    inputTokenSymbol === "USDC.e" ||
    inputTokenSymbol === "USDT.e"
  ) {
    return 6;
  }
  else if (inputTokenSymbol === "WBTC") {
    return 8;
  }
  return 18;
}


export const getIntentContract = (originChainId: number) => {
  for (const chain of contractConfig) {
    if (chain.chainId === originChainId) {
      return chain.contractAddress as `0x${string}`;
    }
  }
  return null;
}


export const getChain = (chainId: number) => {
  if (chainId === 8453) {
    console.log("base", base);
    return base;
  }
  if (chainId === 42161) {
    console.log("arbitrum", arbitrum);
    return arbitrum;
  }
  if (chainId === 10) {
    console.log("optimism", optimism);
    return optimism;
  }
  return base;
}
