import { useQuery } from "@tanstack/react-query";
import { useStepStore } from "../store/stepStore";
import { getChainLogo, getChainScan } from "../utils";
import { useIntentStore } from "../store/intentStore";

export const useDepositStatus = (depositTxHash: string | undefined) => {


    const { data: depositStatus, isError, isSuccess, refetch } = useQuery({
        queryKey: ["depositStatus", depositTxHash],
        queryFn: async () => {
            if (depositTxHash === undefined) {
                return undefined;
            }
            const response = await fetch(`https://app.across.to/api/deposit/status?depositTxHash=${depositTxHash}`);
            // If we get a 200, parse the response and check if deposit is filled
            if (response.status === 200) {
                const data = await response.json();
                if (data.status === "filled") {
                    useStepStore.getState().setStep(4);
                    useIntentStore.getState().setLoading(false);
                    return data;

                }
            }
            // If not 200, throw error to trigger retry
            throw new Error(`Status ${response.status}`);
        },
        enabled: !!depositTxHash,
        retry: 10,
        retryDelay: 1000,
        refetchIntervalInBackground: true,
    });// console.log("depositStatus", depositStatus);


    const originChainImage = getChainLogo(depositStatus?.originChainId);
    const destinationChainImage = getChainLogo(depositStatus?.destinationChainId);
    const originChainScan = getChainScan(depositStatus?.originChainId, depositStatus?.depositTxHash);
    const destinationChainScan = getChainScan(depositStatus?.destinationChainId, depositStatus?.depositTxHash);

    return {
        depositStatus,
        isError,
        isSuccess,
        refetch,
        originChainImage,
        destinationChainImage,
        originChainScan,
        destinationChainScan,
    };
}