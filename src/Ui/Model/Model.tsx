import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

interface IModal {
  openmodel: boolean
  closemodel: () => void
  title: string
  forminput?: React.ReactNode
  children?: React.ReactNode
  
}
export default function MyModal({ openmodel, closemodel, title, forminput ,children }: IModal) {
  console.log(title)
  return (
    <>
      <Dialog open={openmodel} as="div" className="relative z-10 focus:outline-none" onClose={closemodel} __demoMode>
        <div className="bg-[rgba(255,255,255,0.54)] fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                {title}
              </DialogTitle>
              <div className="">
                {forminput}
              </div>
              <div className="">
               {children}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
