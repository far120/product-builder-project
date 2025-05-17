import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useTheme } from "../utils/ThemeContext";

interface IModal {
  openmodel: boolean
  closemodel: () => void
  title: string
  forminput?: React.ReactNode
  children?: React.ReactNode

}
export default function MyModal({ openmodel, closemodel, title, forminput, children }: IModal) {
  const { themeStyles } = useTheme();
  return (
    <>
      <Dialog open={openmodel} as="div" className="relative z-50 focus:outline-none" onClose={closemodel} __demoMode>
        {/* Overlay with theme-aware background and opacity */}
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.54)] backdrop-blur-sm flex items-center justify-center z-50">
        <div className="fixed inset-0 z-50 flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className={`w-full max-w-md rounded-2xl p-8 shadow-2xl border ${themeStyles.card} ${themeStyles.text} border-main duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0`}
          >
            <DialogTitle as="h3" className={`text-2xl font-bold mb-4 text-center ${themeStyles.text}`}>
              {title}
            </DialogTitle>
            <div className="mb-2">
              {forminput}
            </div>
            <div>
              {children}
            </div>
          </DialogPanel>
        </div>
      </div>
      </Dialog>
    </>
  )
}
