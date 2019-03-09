import { h } from 'preact'
import classNames from 'classnames'
import './button.css'
/** @jsx h */

const Button = ({ onClick, text, fullWidth, size, disabled, className }) => {
  const classes = classNames('Button', `Button--${size}`, {
    'Button--full': fullWidth,
    'is-disabled': disabled
  }, className)
  return <div className={classes} onClick={!disabled && onClick}>{text}</div>
}

export default Button
