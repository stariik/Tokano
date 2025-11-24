"use client";

import React, { useEffect } from "react";
import Live from "@/Components/Live/Live";
import LaunchingSoon from "@/Components/LaunchingSoon/LaunchingSoon";
import HomeRightMenu from "@/Components/RightMenu/HomeRightMenu";
import HomeTokenGrid from "@/Components/Memes/HomeTokenGrid";
import { useBalances } from "@/contexts/balances-context";
import Banner from "@/Components/Banner";
import SoonMenuMobile from "@/Components/SoonMenu/SoonMenuMobile";

export default function Home() {
  const { tokens } = useBalances();

  useEffect(() => {
    console.log("tokens", tokens);
  }, [tokens]);

  return (
    <main className="dark:bg-dark relative bg-[#f5f5f5] px-2 lg:px-2">
      <div className="lg:mb-4">
        {/* <div className="grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-2 xl:gap-4">
          <div className="gap-2 md:col-span-1 lg:col-span-2 lg:grid lg:grid-cols-2 xl:gap-4">
            <div className="">
              <LaunchingSoon />
            </div>
            <div className="flex justify-center md:block 2xl:flex">
              <Live />
            </div>
          </div>
          <RightMenu />
        </div> */}

        <div className="mx-auto max-w-lg justify-between gap-4 md:flex md:max-w-full md:px-2 lg:py-6 2xl:gap-4 2xl:px-2">
          <div className="xl:w-1/3">
            <LaunchingSoon />
          </div>
          <div className="md:w-1/2 xl:w-1/3 2xl:max-w-2xl">
            <Live />
          </div>
          <div className="md:max-w-[360px] lg:w-1/3 lg:max-w-full">
            <HomeRightMenu />
          </div>
        </div>
      </div>
      <Banner src={"banner1.png"} />

      <div className="mx-auto mt-4 w-full max-w-lg min-[385px]:flex min-[385px]:justify-center md:max-w-full">
        <HomeTokenGrid gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-9" />
      </div>

      <SoonMenuMobile />
    </main>
  );
}
