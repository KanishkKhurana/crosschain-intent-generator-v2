import { useQuery } from "@tanstack/react-query";

export const useDepositStatus = (depositTxHash: string | undefined) => {


    const { data: depositStatus } = useQuery({
        queryKey: ["depositStatus", depositTxHash],
        queryFn: async () => {
            if (depositTxHash === undefined) {
                return undefined;
            }
            // const response = await fetch(`https://app.across.to/api/deposit/status?depositTxHash=${depositTxHash}`);
            const response = await fetch(`https://app.across.to/api/deposit/status?depositTxHash=0x56a86610aad2a653161c9dd4b4972f948198fd02ae9589cfac1d57bd86a156c1`);
            const data = await response.json();
            return data;
        },
        enabled: !!depositTxHash,
    });

    console.log("depositStatus", depositStatus);

    return {
        depositStatus,
    };
}