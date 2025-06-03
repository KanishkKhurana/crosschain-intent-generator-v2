import { useQuery } from "@tanstack/react-query";
import { useAcross } from "../across";
import { buildQueryKey } from "../utils";
import { AcrossClient } from "@across-protocol/app-sdk";
import { useIntentStore } from "../store/intentStore";
import { useEffect } from "react";

export type useAvailableRoutesParams = Parameters<
  AcrossClient["getAvailableRoutes"]
>[0];

export const useAvailableRoutes = (
  params: useAvailableRoutesParams,
  enabled = true
) => {
  const { setRoutes, setInputToken, setOutputToken, setInputTokenSymbol } = useIntentStore();
  const sdk = useAcross();

  const queryKey = buildQueryKey("availableRoutes", params);

  const { data: availableRoutes } = useQuery({
    queryKey,
    queryFn: () => {
      if (!params.originChainId || !params.destinationChainId) {
        return undefined;
      }
      return sdk.getAvailableRoutes(params);
    },
    enabled,
  });

  useEffect(() => {
    if (availableRoutes) {
      setRoutes(availableRoutes);
      setInputToken(availableRoutes[0].inputToken);
      setOutputToken(availableRoutes[0].outputToken);
      setInputTokenSymbol(availableRoutes[0].inputTokenSymbol);
    }
  }, [availableRoutes, setRoutes, params.originChainId, params.destinationChainId, setInputToken, setOutputToken, setInputTokenSymbol]);

  return { availableRoutes };
}