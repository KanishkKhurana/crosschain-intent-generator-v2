import { useQuery } from "@tanstack/react-query";
import { useStepStore } from "../store/stepStore";

export const useDepositStatus = (depositTxHash: string | undefined) => {
    const { step } = useStepStore();


    const { data: depositStatus, isError, isSuccess, refetch } = useQuery({
        queryKey: ["depositStatus", depositTxHash],
        queryFn: async () => {
            if (depositTxHash === undefined) {
                return undefined;
            }
            const response = await fetch(`https://app.across.to/api/deposit/status?depositTxHash=${depositTxHash}`);
            
            // If we get a 200, return the data and stop polling
            if (response.status === 200) {
                const data = await response.json();
                return data;
            }
            
            // If not 200, throw error to trigger retry
            throw new Error(`Status ${response.status}`);
        },
        enabled: !!depositTxHash,
        retry: 10,
        retryDelay: 1000,
        refetchIntervalInBackground: true,
    });

    // console.log("depositStatus", depositStatus);
  if (step === 3) {
    useStepStore.getState().setStep(4);
  }


    return {
        depositStatus,
        isError,
        isSuccess,
        refetch,
    };
}