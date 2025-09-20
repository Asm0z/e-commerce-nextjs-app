import React from 'react'
import Image from "next/image";

export default function NotFound() {
  return (
    <div className='flex justify-center items-center' >
      <Image src="/images/not-found.svg" alt="not-found" width={400} height={400} className="w-1/3" />
    </div>
  )
}
