import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
})

const actions = ['showSnackbar']

function map (state) {
  return {
    snackbar: state.snackbar
  }
}

class Snack extends Component {
  render () {
    const { classes, snackbar } = this.props

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={snackbar.open}
        autoHideDuration={8000}
        onClose={() => this.handleClose()}
        message={snackbar.message}
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
    )
  }

  handleClose () {
    this.props.showSnackbar({ open: false })
  }
}

export default withStyles(styles)(
  connect(map, actions)(Snack)
)
