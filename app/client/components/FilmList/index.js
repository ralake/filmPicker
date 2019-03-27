import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/core/styles'

import Film from '../Film'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 9
  }
})

function FilmList (props) {
  const { classes, films } = props
  if (!films) return null

  return (
    <Grid item xs={6}>
      <Paper className={classes.paper}>
        <List>
          {films.map(film => <Film film={film} />)}
        </List>
      </Paper>
    </Grid>
  )
}

export default withStyles(styles)(FilmList)
