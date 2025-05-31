import WalletInputCard from "@/components/WalletInputCard";
import FeeDisplayCard from "@/components/FeeDisplayCard";
import IntentResultCard from "@/components/IntentResultCard";

// states emitted for all cards:
// 1. activeness
// 2. wallet context only used by card 1 and 3
// 3. Fee API usage by card 2 and passed on to card 3
// 4. 

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-5">
      <WalletInputCard />
      <FeeDisplayCard />
      <IntentResultCard />
    </div>
  );
}
