import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import green from '@material-ui/core/colors/green'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
})

const actions = ['showSnackbar']

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
  info: InfoIcon
}

function map (state) {
  return {
    snackbar: state.snackbar
  }
}

class Snack extends Component {
  render () {
    const { classes, snackbar } = this.props
    const { type, duration, message, show } = snackbar
    const Icon = variantIcon[type]

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={show}
        autoHideDuration={duration}
        onClose={() => this.handleClose()}
      >
        <SnackbarContent
          className={classes[type]}
          message={
            <span className={classes.message}>
              <Icon className={`${classes.icon} ${classes.iconVariant}`} />
              {message}
            </span>
          }
          action={[
            <IconButton
              key='close'
              color='inherit'
              className={classes.close}
              onClick={() => this.handleClose()}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Snackbar>
    )
  }

  handleClose () {
    this.props.showSnackbar({ show: false })
  }
}

export default withStyles(styles)(
  connect(map, actions)(Snack)
)
