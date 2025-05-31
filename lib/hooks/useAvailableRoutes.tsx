import { useQuery } from "@tanstack/react-query";
import { useAcross } from "../across";
import { buildQueryKey } from "../utils";
import { AcrossClient } from "@across-protocol/app-sdk";

export type useAvailableRoutesParams = Parameters<
  AcrossClient["getAvailableRoutes"]
>[0];

export function useAvailableRoutes(
  params: useAvailableRoutesParams,
  enabled = true,
) {
  const sdk = useAcross();

  const queryKey = buildQueryKey("availableRoutes", params);

  const { data: availableRoutes } = useQuery({
    queryKey,
    queryFn: () => {
      return sdk.getAvailableRoutes(params);
    },
    enabled,
    refetchInterval: Infinity,
  });

  console.log('Available Routes:', availableRoutes);

  return { availableRoutes };
}