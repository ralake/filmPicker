import React from 'react'
import { useAtom } from 'tiny-atom/react/hooks'
import './modal-overlay.css'

const ModalOverlay = (props) => {
  const showModalOverlay = useAtom(state => state.showModalOverlay)
  if (showModalOverlay) {
    return <div className='ModalOverlay' />
  } else {
    return null
  }
}

export default ModalOverlay
