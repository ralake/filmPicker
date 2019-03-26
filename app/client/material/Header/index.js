import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import TheatersIcon from '@material-ui/icons/Theaters'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  title: {
    flexGrow: 1
  }
}

class Header extends Component {
  render () {
    const { classes } = this.props
    return (
      <AppBar
        color='primary'
      >
        <Toolbar>
          <Typography
            variant='h6'
            color='inherit'
            className={classes.title}
          >
            Film picker
          </Typography>
          {this.renderButtons()}
        </Toolbar>
      </AppBar>
    )
  }

  renderButtons () {
    return (
      <Fragment>
        <IconButton>
          <AddIcon />
        </IconButton>
        <IconButton>
          <TheatersIcon />
        </IconButton>
        <IconButton>
          <CloudDownloadIcon />
        </IconButton>
      </Fragment>
    )
  }
}

export default withStyles(styles)(Header)
