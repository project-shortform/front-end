import { motion } from 'framer-motion'
import { DeleteIcon } from '../../assets/svgComponents'

interface LoginModalProps {
  onClick: () => void
  children: React.ReactNode
}

const Modal = (props: LoginModalProps) => {
  const {onClick, children} = props
  return (
    <div onClick={onClick} className="fixed inset-0 z-50 flex min-h-screen flex flex-col items-center justify-center gap-y-2 bg-[rgba(0,0,0,0.6)]">
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="rounded-[1.5rem] px-[1.5rem] pb-[6.25rem] pt-[1.5rem] border border-gray-6 w-[37.5rem] bg-color"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <div className="w-full flex justify-end">
          <DeleteIcon onClick={onClick} width={24} height={24} />
        </div>

        {children}
      </motion.div>
    </div>
  )
}
export default Modal
