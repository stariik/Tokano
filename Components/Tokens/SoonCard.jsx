import React from "react";
import { Khand } from "next/font/google";
import { CiPill } from "react-icons/ci";

const khandSemibold = Khand({ subsets: ["latin"], weight: "600" });
const khandMedium = Khand({ subsets: ["latin"], weight: "400" });

function SoonCard() {
  return (
    <div className="bg-[linear-gradient(90deg,rgba(23,13,86,1)_50%,rgba(98,44,205,1)_100%)] rounded-4xl pb-8">
      <div className="grid grid-cols-3 items-center justify-between bg-[linear-gradient(45deg,rgba(23,13,86,1)_35%,rgba(98,44,205,1)_100%)] rounded-4xl pb-4">
        <div>
          <img src="/image.png" alt="" className="rounded-4xl ml-4 md:ml-8 mt-2 md:mt-4 md:w-36 w-24"/>
        </div>

        <div className="col-span-2">
          <div className="flex w-1/5 md:w-1/4 justify-center relative">
            <CiPill color="#5ecb89" size={25} className="absolute top-1" />
          </div>
          <div className="flex-col  justify-center items-center text-center">
            <p className={`text-xl md:text-2xl font-semibold ${khandSemibold.className}`}>
              YOU'RE FIRED (FIRED)
            </p>
            <h1
              className={`text-3xl md:text-5xl font-bold ${khandSemibold.className} mt-2 md:mt-4`}
            >
              LAUNCHING SOON
            </h1>
            <p className={`bg-[linear-gradient(90deg,rgba(255,212,42,1)_0%,rgba(249,44,157,1)_55%,rgba(237,221,83,1)_100%)] text-[#311880] ${khandSemibold.className} mt-2 rounded-2xl w-38 md:w-48 mx-auto text-xs md:text-sm`}>
              LAUNCHING IN : 23d 45h 12m
            </p>
          </div>
        </div>
      </div>
    </div>
    // <div className="">
    //   <div className="grid grid-cols-3">
    //     <div>
    //       <img src="/image.png" alt="" className="rounded-4xl ml-8 mt-4" />
    //     </div>

    //     <div className="col-span-2">
    //       <div className="flex w-1/5 justify-center relative">
    //         <CiPill color="#5ecb89" size={25} className="absolute top-6" />
    //       </div>
    //       <div className="flex flex-col justify-center items-center text-center">
    //         <p className={`text-2xl font-semibold ${khandSemibold.className}`}>
    //           YOU'RE FIRED (FIRED)
    //         </p>
    //         <h1 className={`text-4xl font-bold ${khandSemibold.className} mt-4`}>
    //           LAUNCHING SOON
    //         </h1>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default SoonCard;
