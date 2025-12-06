"use client";

import React from "react";
import { NumericFormat } from "react-number-format";

function BalanceComp({ value, onChange, maxAmount }) {
  const handleValueChange = (values) => {
    const { value: newValue } = values;
    const maxNum = parseFloat(maxAmount);
    const inputNum = parseFloat(newValue);

    // Validate max amount
    if (inputNum > maxNum) {
      onChange(maxAmount);
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className="flex w-1/3">
      <NumericFormat
        value={value}
        onValueChange={handleValueChange}
        placeholder="0"
        valueIsNumericString={true}
        allowNegative={false}
        thousandSeparator=","
        decimalScale={0}
        className="ml-1 w-full bg-transparent text-xs leading-none font-bold text-[#190E79] outline-none sm:ml-2 sm:text-sm md:ml-0.5 md:text-sm lg:text-sm xl:text-base 2xl:text-xl dark:text-white"
      />
    </div>
  );
}

export default BalanceComp;
