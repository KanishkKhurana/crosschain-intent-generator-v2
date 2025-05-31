import { useQuery } from "@tanstack/react-query";
import { buildQueryKey, getTokenDecimals } from "../utils";
import { useIntentStore } from "../store";
import { getSuggestedFees } from "@across-protocol/app-sdk";
import { parseUnits } from "viem";
import { AcrossClient } from "@across-protocol/app-sdk";
export type useSuggestedFeesParams = Parameters<
  AcrossClient["getSuggestedFees"]
>[0];

export const useSuggestedFees = (
    params: useSuggestedFeesParams,
) => {
  const { originChain, destinationChain, inputToken, outputToken, amount, inputTokenSymbol, setOutputAmount, setAmountWithDecimals, setTotalFees } = useIntentStore();
  const inputTokenDecimals = getTokenDecimals(inputTokenSymbol);
  const amountWithDecimals = parseUnits(amount.toString(), inputTokenDecimals);
  setAmountWithDecimals(amountWithDecimals);

  const queryKey = buildQueryKey("suggestedFees", params);

  const { data: suggestedFees } = useQuery({
    queryKey,
    queryFn: () => {
      if (!originChain || !destinationChain || !inputToken || !outputToken || !amount) {
        return undefined;
      }
      return getSuggestedFees({ 
        originChainId: originChain, 
        destinationChainId: destinationChain, 
        inputToken, 
        outputToken, 
        amount: amountWithDecimals,
      });
    },
    enabled: Boolean(originChain && destinationChain && inputToken && outputToken && amount),
    staleTime: 30000, // Consider data fresh for 30 seconds
    gcTime: 60000, // Keep data in cache for 1 minute
  });

  setOutputAmount(suggestedFees?.outputAmount);
//   setTotalFees(suggestedFees?.totalFees);

  console.log("suggestedFees", suggestedFees);

  return suggestedFees;
}