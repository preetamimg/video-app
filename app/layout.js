import { ClerkProvider } from '@clerk/nextjs'
import '@stream-io/video-react-sdk/dist/css/styles.css';
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Yoom | A video calling app',
  description: 'Created by Preetam Bohara ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider
                appearance={{
                  layout: {
                    socialButtonsVariant: "iconButton",
                    logoImageUrl: "/assets/icons/yoom-logo.svg",
                  },
                  variables: {
                    colorText: "#fff",
                    colorPrimary: "#0E78F9",
                    colorBackground: "#1C1F2E",
                    colorInputBackground: "#252A41",
                    colorInputText: "#fff",
                  },
                }}>
        <body className={`${inter.className} bg-theme2 text-white h-dvh overflow-hidden`}>{children}</body>
      </ClerkProvider>
      <Toaster />
    </html>
  )
}
