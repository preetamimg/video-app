"use client"

import { handleSidebar } from '@/utils/handleSidebar'
import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {

  return (
    <>
      <div className="p-4 bg-theme1">
        <div className="flex items-center justify-between">
          <Link href={'/'}>
          <Image
            src={'/assets/icons/yoom-logo.svg'}
            alt='logo'
            width={110}
            height={45}
            />
          </Link>
          <div className="flex items-center gap-3">
            <div className="cursor-pointer lg:hidden" onClick={handleSidebar}>
              <Image
                src={'/assets/icons/hamburger.svg'}
                alt='hamburger menu'
                height={20}
                width={20}
              />
            </div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar