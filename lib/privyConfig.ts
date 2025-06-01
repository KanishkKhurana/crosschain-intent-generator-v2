import type {PrivyClientConfig} from '@privy-io/react-auth';

// Replace this with your Privy config
export const privyConfig: PrivyClientConfig = {
  loginMethods: ['wallet'],
  appearance: {
    showWalletLoginFirst: true,
    theme: 'dark'
  }
};