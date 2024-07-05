import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const MeetingModal = ({isOpen, onClose, title, buttonTxt, onClickFunction}) => {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-theme2 p-6 border-0 text-white">
        <div className="flex flex-col gap-6 text-center">
          <div className="text-2xl font-semibold">{title}</div>
          <button className='bg-blue-400 text-lg p-2 rounded-lg' onClick={onClickFunction}>{buttonTxt}</button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}

export default MeetingModal