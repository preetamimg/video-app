import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

const MeetingSetup = ({setIsSetupComplete}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false)
  const call = useCall()

  if(!call) throw new error('use call must be use within stream call component')

  useEffect(()=> {
    if(isMicCamToggledOn) {
      call?.camera?.disable()
      call?.microphone?.disable()
    } else {
      call?.camera?.enable()
      call?.microphone?.enable()
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone])

  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
        <div className="w-[90%] max-w-[700px] mx-auto">
          <div className="text-2xl font-bold text-center mb-3">Setup</div>
          <div className="flex items-center justify-center">
            <VideoPreview/>
          </div>
          <div className=" my-3 flex items-center justify-center gap-4">
            <label htmlFor="" className='flex items-center justify-center gap-3 font-semibold'>
              <input type="checkbox"
              checked={isMicCamToggledOn}
              onChange={(e)=>setIsMicCamToggledOn(e.target.checked)}
              />
              Join with camera and mic off
            </label>
            <DeviceSettings/>
          </div>
          <button className='mt-4 bg-blue-400 text-white text-sm mx-auto flex rounded-lg py-2 px-4'
            onClick={()=> {
              call?.join();
              setIsSetupComplete(true)
            }}
          >Join Meeting</button>
        </div>
      </div>
    </>
  )
}

export default MeetingSetup