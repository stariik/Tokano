import React from 'react'
import { FaExclamation } from "react-icons/fa6";

function Attention() {
  return (
    <div className="flex items-center justify-center bg-white rounded-full pl-8 px-4 py-2 shadow-lg border-4 border-gray-200 max-w-sm">
      <h2 className="text-xl md:text-3xl font-bold font-khand text-black mr-4">ATTENTION</h2>
      <div className="flex items-center justify-center bg-white rounded-full w-16 h-16">
        <FaExclamation size={40} color="red" />
      </div>
    </div>
  )
}

export default Attention