import { Component, h } from 'preact'
import Button from '../button'
import Modal from '../modal'
import './login-form.css'
/** @jsx h */

class LoginForm extends Component {
  render () {
    const { atom } = this.context

    if (!atom.user.loggedIn) {
      return (
        <Modal atom={atom} dismissable={false}>
          <div className='LoginForm'>
            <p className='LoginForm-attr'>Email</p>
            <input className='LoginForm-input' type='text' onChange={event => this.updateAuthAttr(event, 'email')} />
            <p className='LoginForm-attr'>Password</p>
            <input className='LoginForm-input' type='text' onChange={event => this.updateAuthAttr(event, 'password')} />
            <Button size='large' onClick={() => this.handleSubmit()} text='Log In' fullWidth />
          </div>
        </Modal>
      )
    } else {
      return null
    }
  }

  updateAuthAttr (event, key) {
    const { value } = event.target
    this.context.split('updateLoginDetails', { key, value })
  }

  handleSubmit () {
    const { atom, split } = this.context
    const { email, password } = atom.user
    split('submitLoginForm', { email, password })
  }
}

export default LoginForm
