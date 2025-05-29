export const contractConfig = {
    "base": {
        "contractAddress": "0x514496264fa0B4Ee0522bC7Db644F78B02AEb1ae",
    },
    "arbitrum": {
        "contractAddress": "0xDE5cFBDE966bF8a187a332EC9c5081A2c8a537c5",
    },
    "optimism": {
        "contractAddress": "0x5cC9dde9Fdc4fE3A910006709bFa7A39155ef93f",
    },
}

export const abi = [
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