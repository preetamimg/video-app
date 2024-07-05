"use client"
import {useCurrentDateAndTime}  from '@/utils/useCurrentDateAndTime'
import React from 'react'

const HeroBanner = () => {
  const {time, date} = useCurrentDateAndTime()

  return (
    <>
      <div className="heroBanner p-6 rounded-lg bg-hero w-full bg-no-repeat bg-cover">
        <div className="flex flex-col">
          <div className="upcomingMeeting bg-theme2 inline-flex py-2 px-3 text-theme3 rounded-md w-max text-sm mb-20">
            Upcoming meeting at 12.00 AM
          </div>
          <div className="time text-5xl font-bold">
            {time}
          </div>
          <div className="date mt-1 text-md">
            {date}
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroBanner