import React from 'react'

function Banner({ src }) {
  return (
    <div className='mb-2'>
        <img src={src} alt="" />
    </div>
  )
}

export default Banner