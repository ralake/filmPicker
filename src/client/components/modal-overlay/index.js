import { h } from 'preact'
import './modal-overlay.css'

const ModalOverlay = (props, context) => {
  const { showModalOverlay } = context.atom
  if (showModalOverlay) {
    return <div className='ModalOverlay' />
  } else {
    return null
  }
}

export default ModalOverlay
