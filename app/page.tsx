import WalletInputCard from "@/components/WalletInputCard";
import FeeDisplayCard from "@/components/FeeDisplayCard";
import IntentResultCard from "@/components/IntentResultCard";
import Image from "next/image";

// states emitted for all cards:
// 1. activeness
// 2. wallet context only used by card 1 and 3
// 3. Fee API usage by card 2 and passed on to card 3
// 4. 

export default function Home() {
  return (
    <div className="flex flex-col pb-6 items-center justify-center px-5 bg-[#2d2e32]">
      <h1 className="text-4xl font-semibold text-white my-6 text-center">
        Crosschain Intent Generator

        <div className=' '>
          <a href="http://across.to" target="_blank" rel="noopener noreferrer"> <div className='flex hover:scale-105 duration-300 transition-all justify-center gap-1 text-[0.75rem] items-center'> Built by <Image src="/across.svg" alt="Across is Unifying Ethereum" className='w-14' width={100} height={100} />  </div></a>
        </div>
      </h1>
      <WalletInputCard />
      <FeeDisplayCard />
      <IntentResultCard />
    </div>
  );
}
