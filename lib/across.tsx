"use client";

import React from "react";
import { AcrossClient } from "@across-protocol/app-sdk";
import { optimism, arbitrum, base } from "viem/chains";

const SUPPORTED_CHAINS = [base, optimism, arbitrum];

const sdk = AcrossClient.create({
  chains: [...SUPPORTED_CHAINS],
  useTestnet: false,
  logLevel: "DEBUG",
  integratorId: "0xdead",
});

const AcrossContext = React.createContext<AcrossClient>(sdk);

export function AcrossProvider({ children }: { children: React.ReactNode }) {
  return (
    <AcrossContext.Provider value={sdk}>{children}</AcrossContext.Provider>
  );
}

export function useAcross() {
  return React.useContext(AcrossContext);
}