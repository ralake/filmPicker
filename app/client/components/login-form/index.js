import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import Button from '../button'
import Modal from '../modal'
import './login-form.css'

function map (state) {
  return {
    user: state.user
  }
}

const actions = ['submitLoginForm', 'updateUser']

class LoginForm extends Component {
  render () {
    const { user } = this.props
    if (user && !user.loggedIn) {
      return (
        <Modal dismissable={false}>
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
    this.props.updateUser({ [key]: value })
  }

  handleSubmit () {
    const { email, password } = this.props.user
    this.props.submitLoginForm({ email, password })
  }
}

export default connect(map, actions)(LoginForm)
