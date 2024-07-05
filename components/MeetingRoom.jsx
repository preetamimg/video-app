import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';


const MeetingRoom = () => {
  const searchParams = useSearchParams()
  const isPersonalRoom = !!searchParams.get('personal')
  const [layout, setLayout] = useState('speaker-left')
  const [showParticipants, setShowParticipants] = useState(false)

  const {useCallCallingState} = useCallStateHooks()
  const callingState = useCallCallingState()
  
  if(callingState !== CallingState.JOINED) return <Loader/>

  const CallLayout = ()=> {
    switch (layout) {
      case 'grid':
      return <PaginatedGridLayout/>
      case 'speaker-right' :
        return <SpeakerLayout participantsBarPosition='left'/>
      default:
        return <SpeakerLayout participantsBarPosition='right'/>
        break;
    }
  }
  return (
    <>
      <div className="relative overflow-hidden h-screen w-full p-4">
        <div className="size-full flex items-center justify-center">
          <div className="flex size-full max-w-[1000px] items-center relative">
            <CallLayout/>
          </div>
          <div className={`h-[calc(100vh_-_86px)] ml-2' ${showParticipants ? 'block' : 'hidden'}`}>
            <CallParticipantsList onClose={()=>setShowParticipants(false)}/>
          </div>
          <div className="fixed bottom-0 w-full flex items-center justify-center gap-5 flex-wrap">
          <CallControls/>
            <DropdownMenu>
              <DropdownMenuTrigger className='cursor-pointer rounded-2xl px-2 size-[35px] bg-[#19232d] py-2 hover:bg-[#4c535b]'>
                <LayoutList
                  size={20}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-theme1 border-0 text-white'>
                {
                  ['Grid', 'Speaker-Left', 'Speaker-Right']?.map((item, index)=> (
                    <>
                      <DropdownMenuItem 
                        key={index}
                        onClick={()=> {
                          setLayout(item?.toLowerCase())
                        }}
                      >{item}</DropdownMenuItem>
                    </>
                  ))
                }
              </DropdownMenuContent>
            </DropdownMenu>

            <CallStatsButton/>
            <button onClick={()=>setShowParticipants(!showParticipants)} className='cursor-pointer rounded-2xl px-2 size-[35px] bg-[#19232d] py-2 hover:bg-[#4c535b]'>
              <Users size={20}/>
            </button>
            {
              !isPersonalRoom && <EndCallButton/>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default MeetingRoom