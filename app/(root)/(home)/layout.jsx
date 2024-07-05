import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const HomeLayout = ({children}) => {
  return (
    <>
    <main className='h-full overflow-hidden flex flex-col'>
      <Navbar/>
      <div className="h-full flex-1 flex overflow-hidden relative">
        <Sidebar/>
        <div className="mainLayout h-full overflow-hidden w-[calc(100%_-_300px)] max-lg:w-full">
          <div className="h-full overflow-y-auto p-5">
            {children}
          </div>
        </div>
      </div>
    </main>
    </>
  )
}

export default HomeLayout