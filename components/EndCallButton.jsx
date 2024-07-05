"use client"
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React from 'react'

const EndCallButton = () => {
  const router = useRouter()
  const call = useCall()
  const {useLocalParticipant} = useCallStateHooks()
  const localParticipant = useLocalParticipant()

  const isMeetingOwner = localParticipant && call?.state?.createdBy && localParticipant?.userId === call?.state?.createdBy?.id

  if(!isMeetingOwner) return null

  return (
    <button 
    className='bg-red-500 rounded-lg text-sm py-2 px-4'
    onClick={()=> {
      call?.endCall()
      router.push('/')
      
    }}>
      End call for everyone
    </button>
  )
}

export default EndCallButton