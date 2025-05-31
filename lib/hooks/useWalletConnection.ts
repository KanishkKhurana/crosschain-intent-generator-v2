import { useConnectWallet } from '@privy-io/react-auth';
import { useWalletStore } from '../store/walletStore';

export const useWalletConnection = () => {
  const { setWalletAddress } = useWalletStore();
  
  const { connectWallet } = useConnectWallet({
    onSuccess: ({wallet}) => {
      console.log("wallet:", wallet);
      setWalletAddress(wallet.address);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { connectWallet };
}; 