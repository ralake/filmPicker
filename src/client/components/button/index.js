import { h } from 'preact'
import classNames from 'classnames'
import './button.css'
/** @jsx h */

const Button = ({ onClick, text, fullWidth, size, disabled }) => {
  const className = classNames('Button', `Button--${size}`, {
    'Button--full': fullWidth,
    'is-disabled': disabled
  })
  return <div className={className} onClick={!disabled && onClick}>{text}</div>
}

export default Button
