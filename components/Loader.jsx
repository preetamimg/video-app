import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen w-full">
        <Image
          src='/assets/icons/loading-circle.svg'
          alt='loader'
          height={50}
          width={50}
        />
      </div>
    </>
  )
}

export default Loader