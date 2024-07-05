"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast"


const ActionCards = () => {
  const { toast } = useToast()
  const router = useRouter();
  const [showMeetingModal, setShowMeetingModal] = useState(false)
  const [showScheduleMeetingModal, setShowScheduleMeetingModal] = useState(false)
  const {user} = useUser()
  const client = useStreamVideoClient()
  const [values, setValues] = useState({
    dateTime : new Date(),
    description : '',
    link : ''
  })
  const [callDetails, setCallDetails] = useState()

  const handleNewMeeting = ()=> {
    setShowMeetingModal(true)
  }
  const handleJoinMeeting = ()=> {}
  const handleScheduleMeeting = ()=> {}
  const handleViewRecording = ()=> {
    router.push('/recordings');
  }


  const createMeeting = async ()=> {
    if(!client || !user) return;

    try {
      if(!values?.dateTime) {
        toast({
          title: "Please select date and time",
        })
        return;
      }
      const id = crypto.randomUUID()
      const call = client.call('default', id)

      if(!call) throw new error('failed to create call')
      
      const startsAt = values?.dateTime?.toISOString() || new Date(Date.now())?.toISOString()
      const description = values?.description || 'Instant Meeting'

      await call.getOrCreate({
        data : {
          starts_at : startsAt,
          custom : {
            description
          }
        }
      })
      setCallDetails(call)

      if(!values?.description) {
        router.push(`/meeting/${call?.id}`)
      }
      toast({
        title: "Meeting created successfully",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Failed to create a meeting",
      })
    }
  }

  const scheduleMeeting = async ()=> {

  }


  const cardData = [
    {
      color: 'bg-cyan-500',
      iconColor: 'bg-cyan-400',
      image : '/assets/icons/add-meeting.svg',
      title : 'New Meeting',
      description : 'Start an Instant Meeting',
      action : handleNewMeeting
    },
    {
      color: 'bg-sky-500',
      iconColor: 'bg-sky-400',
      image : '/assets/icons/join-meeting.svg',
      title : 'Join Meeting',
      description : 'Via Invitation Link',
      action : handleJoinMeeting
    },
    {
      color: 'bg-blue-500',
      iconColor: 'bg-blue-400',
      image : '/assets/icons/schedule.svg',
      title : 'Schedule Meeting',
      description : 'Plan your Meeting',
      action : handleScheduleMeeting
    },
    {
      color: 'bg-indigo-500',
      iconColor: 'bg-indigo-400',
      image : '/assets/icons/recordings.svg',
      title : 'View Recordings',
      description : 'Checkout your recordings',
      action : handleViewRecording
    },
  ]
  return (
    <>
      <section className='grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mt-6'>
        {
          cardData?.map(item=>(
            <>
              <div className={`box rounded-lg p-5 cursor-pointer ${item?.color}`} onClick={item?.action}>
                <div className={`icon size-10 flex items-center justify-center rounded-md ${item?.iconColor}`}>
                  <Image 
                    src={item?.image}
                    alt="icon"
                    height={20}
                    width={20}
                  />
                </div>
                  <div className="title font-bold text-xl mt-14">{item?.title}</div>
                  <div className="desc text-sm">{item?.description}</div>
              </div>
            </>
          ))
        }
      </section>
      {/* model for schedule a meeting */}
      {
        !callDetails ? 
        <MeetingModal
          isOpen={showScheduleMeetingModal}
          onClose={()=>setShowScheduleMeetingModal(false)}
          title={'Schedule a new meeting'}
          onClickFunction={scheduleMeeting}
        >

          <div className="flex flex-col gap-2.5">

          </div>
        </MeetingModal>
        : 
        <MeetingModal
        isOpen={showScheduleMeetingModal}
        onClose={()=>setShowScheduleMeetingModal(false)}
        title={'Meeting Created'}
        buttonTxt={'Copy Meeting Link'}
        onClickFunction={()=> {
          // navigator.clipboard.writeText(meetingLink)
          // toast({title : 'Link Copied'})
        }}
        image={'/assets/icons/checked.svg'}
        buttonIcon={'/public/assets/icons/copy.svg'}
      />
      }
      {/* modal for add new meeting */}
      <MeetingModal
        isOpen={showMeetingModal}
        onClose={()=>setShowMeetingModal(false)}
        title={'Start a new meeting'}
        buttonTxt={'Start Meeting'}
        onClickFunction={createMeeting}
      />
    </>
  )
}

export default ActionCards