import React from 'react'

function Attention() {
  return (
    <div className="flex items-center justify-center bg-white rounded-full px-8 py-4 shadow-lg border-4 border-gray-200 max-w-sm">
      <h2 className="text-3xl khand-semibold text-black mr-4">ATTENTION</h2>
      <div className="flex items-center justify-center bg-red-600 rounded-full w-12 h-16">
        <span className="text-white text-5xl khand-semibold pb-2">!</span>
      </div>
    </div>
  )
}

export default Attention