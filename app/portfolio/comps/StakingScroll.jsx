import React from 'react'
import StakeCard from '../../../Components/Tokens/StakeCard'
import { cardData } from "@/data/data";

function StakingScroll({ stakingData = [] }) {
  return (
    <div className='border-1 border-secondary rounded-3xl text-white'>
        <div className="py-2 pl-6 border-b-1 border-secondary">
            YOU ARE STAKING
        </div>
        <div className="py-2 pl-16 flex justify-between pr-8 bg-[#231570]">
            <div>
                LIMASIRA
            </div>
            <div>
                all | time | size
            </div>
        </div>
        <div className="max-h-200 overflow-y-auto border-x-1 border-secondary mx-6 p-6">
            {cardData.map((stake, index) => (
                <div key={index} className="mb-4">
                    <StakeCard
                        id={stake.id}
                        title={stake.title}
                        created={stake.created}
                        marketCap={stake.marketCap}
                        wallet={stake.wallet}
                    />
                </div>
            ))}
        </div>
        <div className="text-center py-2 border-t-1 border-secondary">
            total tokens staking: 12,45,110.12 LIMAS
        </div>

    </div>
  )
}

export default StakingScroll