import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import user from '../../lib/user'

const actions = ['showLoginForm']

const EMAIL_AUTH_ISSUES = [
  'auth/user-not-found',
  'auth/invalid-email'
]

const PASSWORD_AUTH_ISSUES = [
  'auth/wrong-password'
]

function map (state) {
  return { show: state.showLoginForm }
}

class LoginFormDialog extends Component {
  constructor () {
    super()
    this.state = {
      user: {},
      errors: null
    }
  }

  render () {
    const { show } = this.props
    const { errors, user } = this.state
    const { email, password } = user
    const emailError = errors === 'email'
    const passwordError = errors === 'password'

    return (
      <Dialog
        open={show}
        fullWidth
        maxWidth='sm'
        onClose={() => this.handleClose()}
      >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            error={emailError}
            autoFocus
            margin='dense'
            label='Email'
            fullWidth
            onChange={(e) => this.handleChange({ email: e.target.value })}
            value={email}
          />
          <TextField
            error={passwordError}
            margin='dense'
            label='Password'
            type='password'
            fullWidth
            onChange={(e) => this.handleChange({ password: e.target.value })}
            value={password}
          />
          {this.renderActions()}
        </DialogContent>
      </Dialog>
    )
  }

  renderActions () {
    const { email, password } = this.state.user
    const disabled = !email || !password

    return (
      <DialogActions>
        <Button
          onClick={() => this.handleLogin()}
          color='primary'
          disabled={disabled}
        >
          Login
        </Button>
      </DialogActions>
    )
  }

  handleChange (updates) {
    const { user } = this.state
    this.setState({
      user: {
        ...user,
        ...updates
      }
    })
  }

  handleClose () {
    this.props.showLoginForm({ show: false })
  }

  handleLogin () {
    const { email, password } = this.state.user
    const { showLoginForm } = this.props

    user.login({ email, password })
      .then(d => showLoginForm({ show: false }))
      .catch(({ code }) => {
        let type
        if (EMAIL_AUTH_ISSUES.includes(code)) type = 'email'
        if (PASSWORD_AUTH_ISSUES.includes(code)) type = 'password'

        if (type) {
          this.setState({
            errors: type
          })
        }
      })
  }
}

export default connect(map, actions)(LoginFormDialog)
