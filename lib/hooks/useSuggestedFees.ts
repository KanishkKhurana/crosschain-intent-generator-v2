import { useEffect } from "react";
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
  enabled = true
) => {
  const { setOutputAmount, setAmountWithDecimals, inputTokenSymbol } = useIntentStore();


  // Convert amount to decimals
  const amountWithDecimals = getTokenDecimals(inputTokenSymbol);
  const amountWithDecimalsBigInt = parseUnits(params.amount?.toString() ?? "0", amountWithDecimals as number);

  const queryKey = buildQueryKey("suggestedFees", {
    ...params,
    amount: amountWithDecimalsBigInt
  });

  const { data: suggestedFees } = useQuery({
    queryKey,
    queryFn: () => {
      if (!params.originChainId || !params.destinationChainId || !params.inputToken || !params.outputToken || !params.amount) {
        return null;
      }
      return getSuggestedFees({
        ...params,
        amount: amountWithDecimalsBigInt
      });
    },
    enabled,
  });

  // Update store with results
  useEffect(() => {
    if (suggestedFees) {
      setOutputAmount(suggestedFees.outputAmount);
      setAmountWithDecimals(amountWithDecimalsBigInt);
    }
  }, [suggestedFees, setOutputAmount, setAmountWithDecimals, amountWithDecimalsBigInt]);


  return { suggestedFees };
}