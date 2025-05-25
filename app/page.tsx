"use client"
import { useState } from "react";
import Image from "next/image";
import {useConnectWallet} from '@privy-io/react-auth';
import WalletInputCard from "@/components/walletInputCard";
import FeeDisplayCard from "@/components/feeDisplayCard";
import IntentResultCard from "@/components/intentResultCard";

// states emitted for all cards:
// 1. activeness
// 2. wallet context only used by card 1 and 3
// 3. Fee API usage by card 2 and passed on to card 3
// 4. 

export default function Home() {
  const [userWallet, setUserWallet] = useState<string | null>(null);
  const {connectWallet} = useConnectWallet({
    onSuccess: ({wallet}) => {
        console.log(wallet);
        setUserWallet(wallet.address);
    },
    onError: (error) => {
        console.log(error);
    },
});

  return (
    <div className="flex flex-col items-center justify-center px-5">
      <WalletInputCard walletAddress={userWallet} connectWallet={connectWallet} />
      <FeeDisplayCard />
      <IntentResultCard />
    </div>
  );
}
