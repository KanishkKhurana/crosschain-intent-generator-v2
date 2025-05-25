'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {PrivyProvider} from '@privy-io/react-auth';
// Make sure to import these from `@privy-io/wagmi`, not `wagmi`
import {WagmiProvider, createConfig} from '@privy-io/wagmi';

import {privyConfig} from './privyConfig';
import {config} from './wagmiConfig';

const queryClient = new QueryClient();

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <PrivyProvider appId="cmb0o0sa300pkjm0mtyvghw5b" config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}