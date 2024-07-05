"use client"
import { sidebarLinks } from '@/constants'
import { handleSidebar } from '@/utils/handleSidebar'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
  const pathname = usePathname()
  return (
    <>
    <div className="sidebarLayer hidden bg-slate-500/25 fixed h-dvh w-dvw z-10 top-0 left-0" onClick={handleSidebar}></div>
        <div className="sidebar h-full overflow-hidden bg-theme1 w-[300px] max-lg:absolute max-lg:left-0 max-lg:top-0 max-lg:z-20 max-lg:translate-x-[-100%] transition-transform">
          <div className="h-full overflow-y-auto p-5">
            <div className="flex flex-col">
              {
                sidebarLinks?.map(link=>{
                  const iActive = pathname === link.route;
                  // const iActive = pathname === link.route || pathname?.startsWith(link.route);
                  return (
                    <>
                      <Link 
                        href={link?.route} 
                        key={link?.label}
                        className={`flex items-center p-4 mb-2 rounded-lg text-md group hover:bg-blue-400 hover:text-white ${iActive ? 'bg-blue-400 text-white' : 'text-theme3'}`} 
                        >
                        <Image src={link?.imgUrl} alt={link?.label} height={20} width={20} className={`mr-3 object-contain group-hover:brightness-[100] ${iActive ? 'brightness-[100]' : ''}`}/>
                        {link?.label}
                      </Link>
                    </>
                  )
                })
              }
            </div>
          </div>
        </div>
    </>
  )
}

export default Sidebar