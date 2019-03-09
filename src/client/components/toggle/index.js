import { Component, h } from 'preact'
import './toggle.css'
/** @jsx h */

class Toggle extends Component {
  render () {
    const { toggled, onChange, descriptor } = this.props
    return (
      <div className='Toggle'>
        <label className='Toggle-label'>
          <input className='Toggle-input' type='checkbox' checked={toggled} onChange={onChange} />
          <div className='Toggle-slider' />
        </label>
        <p className='Toggle-descriptor'>{descriptor}</p>
      </div>
    )
  }
}

export default Toggle
