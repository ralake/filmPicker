import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'

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
          {films.map(film => {
            return (
              <ListItem>
                <ListItemText
                  primary={film.name}
                />
              </ListItem>
            )
          })}
        </List>
      </Paper>
    </Grid>
  )
}

export default withStyles(styles)(FilmList)
