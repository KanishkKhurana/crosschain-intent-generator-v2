import { createWalletClient, http, createPublicClient, custom } from 'viem';
import { AcrossOriginSettlementContractOpenAbi, getChain, getIntentContract } from '../utils';
import { mainnet, base, optimism, arbitrum } from 'viem/chains';
import { useWalletStore } from '../store/walletStore';
import { useWriteContract } from 'wagmi'
import { useIntentStore } from '../store/intentStore';



export const executeTransaction = async (transaction: any) => {
    const {originChain} = transaction;

    // 1. Create a viem client
    const publicClient = createPublicClient({
        chain: getChain(originChain), 
        transport: http(), // you can customize the RPC endpoint
    })
    
    console.log("walletAddress here:", transaction.walletAddress);
    const intentContract = getIntentContract(originChain) as `0x${string}`;

    

    // Create wallet client for sending transactions
    const walletClient = createWalletClient({
        account: transaction.walletAddress as `0x${string}`,
        chain: getChain(originChain),
        transport: custom(window.ethereum),
    });

    console.log("here:", originChain);
    await walletClient.switchChain({
        id: originChain,
    });

    console.log("fullfun")
    // Simulate the contract call first
    try {
        const simulationResult = await publicClient.simulateContract({
            account: transaction.walletAddress as `0x${string}`,
            address: intentContract as `0x${string}`, 
            abi: AcrossOriginSettlementContractOpenAbi,
            functionName: 'open',
            args: [{
                orderData: transaction.orderData,
                fillDeadline: transaction.fillDeadline,
                orderDataType: transaction.orderDataType,
            }],
        });
    } catch (error: any) {
        // Check if error is due to insufficient allowance
        if (error.message.includes('transfer amount exceeds allowance')) {
            console.log("Insufficient allowance, approving USDC...");
            
            // Approve USDC spending
            const tx = await walletClient.writeContract({
                address: transaction.inputToken,
                abi: [{
                    name: 'approve',
                    type: 'function',
                    stateMutability: 'nonpayable',
                    inputs: [
                        { name: 'spender', type: 'address' },
                        { name: 'amount', type: 'uint256' }
                    ],
                    outputs: [{ type: 'bool' }]
                }],
                functionName: 'approve',
                args: [
                    intentContract,
                    transaction.inputTokenSymbol === "USDC"
                        ? BigInt(10000000)
                        : transaction.inputTokenSymbol === "WBTC"
                        ? BigInt(1000000000)
                        : BigInt('5000000000000000000')
                ]
            });
            
            // Wait for approval transaction to be mined
            await publicClient.waitForTransactionReceipt({ hash: tx });
            console.log("USDC approved successfully");
        } else {
            // If error is not related to allowance, rethrow
            
            throw error;
        }
    }
    const request = await publicClient.simulateContract({
        account: transaction.walletAddress as `0x${string}`, 
        address: intentContract as `0x${string}`,
        abi: AcrossOriginSettlementContractOpenAbi,
        functionName: 'open',
        args: [{
            orderData: transaction.orderData,
            fillDeadline: transaction.fillDeadline,
            orderDataType: transaction.orderDataType,   
        }],
    });
    console.log("request:", request);

    const tx = await walletClient.writeContract({
        address: intentContract as `0x${string}`,
        abi: AcrossOriginSettlementContractOpenAbi,
        functionName: 'open',
        args: [{
            orderData: transaction.orderData,
            fillDeadline: transaction.fillDeadline,
            orderDataType: transaction.orderDataType,
        }],
    });
    console.log("tx:", tx);
}


