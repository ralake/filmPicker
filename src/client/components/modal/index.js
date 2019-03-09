import { Component, h } from 'preact'
import './modal.css'
/** @jsx h */

class Modal extends Component {
  render () {
    const { children, dismissable, handleClose } = this.props
    const closeButton = dismissable ? <div className='Modal-close' onClick={handleClose}>&#x2715;</div> : null

    return (
      <div className='Modal'>
        {closeButton}
        <div className='Modal-body'>{children}</div>
      </div>
    )
  }
}

export default Modal
