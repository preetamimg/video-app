import StreamVideoProvider from '@/providers/SteamClientProvider'
import React from 'react'

const RootLayout = ({children}) => {
  return (
    <>
    <StreamVideoProvider>
      {children}
    </StreamVideoProvider>
    </>
  )
}

export default RootLayout