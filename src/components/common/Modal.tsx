import { motion } from 'framer-motion'
import { DeleteIcon } from '../../assets/svgComponents'

interface LoginModalProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
  isDeleteIcon?: boolean
}

const Modal = (props: LoginModalProps) => {
  const { onClick, children, className, isDeleteIcon = true } = props
  return (
    <div
      onClick={isDeleteIcon ? onClick : undefined}
      className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center gap-y-2 bg-[rgba(0,0,0,0.6)]"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={`${className ? className : ''} border-gray-6 bg-color w-[37.5rem] rounded-[1.5rem] border px-[1.5rem] pt-[1.5rem] pb-[6.25rem]`}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        {isDeleteIcon && (
          <div className="flex w-full justify-end">
            <DeleteIcon onClick={onClick} width={24} height={24} />
          </div>
        )}
        {children}
      </motion.div>
    </div>
  )
}
export default Modal
