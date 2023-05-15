import { useFloating, FloatingPortal, arrow, shift, offset, type Placement } from '@floating-ui/react'
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  placement?: Placement
}

export default function PopOver({ children, className, renderPopover, placement = 'bottom-end' }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)
  const { x, y, strategy, refs, middlewareData } = useFloating({
    middleware: [
      offset(8),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    placement: placement
  })

  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }
  return (
    <div className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}

      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <span
                ref={arrowRef}
                className='border-x-transparent border-t-transparent border-b-white border-[11px] absolute translate-y-[-90%] z-10'
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
