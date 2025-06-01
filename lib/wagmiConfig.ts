import {arbitrum, base, mainnet, optimism, sepolia} from 'viem/chains';
import {http} from 'wagmi';

import {createConfig} from '@privy-io/wagmi';

// Replace these with your app's chains

export const config = createConfig({
  chains: [mainnet, sepolia, base, optimism, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
});