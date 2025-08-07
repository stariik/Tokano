import React from "react";
import Live from "@/Components/Live/Live";
import PlatrformStats from "@/Components/PlatformStats/PlatrformStats";

export default function Home() {
  return (
    <main className="md:px-6 px-2 py-18 md:py-6 bg-dark text-light">
      {/* rounded-tr-4xl lg:rounded-r-4xl */}
      <div className="grid-cols-2 grid ">

        <PlatrformStats />
        <Live />
      </div>
      
    </main>
  );
}
