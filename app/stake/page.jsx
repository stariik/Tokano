import React from "react";
import StakeCard from "./Components/StakeCard";


function page() {
  return (
    <main className="md:px-6 px-2 py-18 md:py-6 bg-dark text-light">
      {/* rounded-tr-4xl lg:rounded-r-4xl */}
      <div className="grid-cols-2 grid ">
        <StakeCard />
      </div>
    </main>
  );
}

export default page;
