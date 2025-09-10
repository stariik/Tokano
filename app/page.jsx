import React from "react";
import Live from "@/Components/Live/Live";
import LaunchingSoon from "@/Components/PlatformStats/LaunchingSoon";

export default function Home() {
  return (
    <main className="md:px-6 px-2 py-18 md:py-6 bg-dark text-light">
      {/* rounded-tr-4xl lg:rounded-r-4xl */}
      <div className="lg:grid-cols-2 grid gap-4 border-2 border-secondary rounded-tr-4xl">
        <LaunchingSoon />
        <Live />
      </div>
      
    </main>
  );
}
