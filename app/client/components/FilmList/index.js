import React, { useState } from 'react'
import { connect } from 'tiny-atom/react'
import { orderBy } from 'lodash-es'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import { withStyles } from '@material-ui/core/styles'

import Film from '../Film'

function map (state) {
  return {
    userLoggedIn: !state.showLoginForm
  }
}

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 9
  },
  subheader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `0 ${theme.spacing.unit * 2}px ${theme.spacing.unit}px 0`
  },
  select: {
    minWidth: 120,
    marginTop: theme.spacing.unit
  }
})

function FilmList (props) {
  const { classes, films, userLoggedIn, title, initialOrder } = props
  const [order, setOrder] = useState(initialOrder)
  if (!films || !userLoggedIn) return null
  const orderedFilms = orderBy(
    films.map(f => ({ ...f, dateAdded: new Date(f.dateAdded) })), [order]
  ).map(f => ({ ...f, dateAdded: f.dateAdded.toDateString() }))

  return (
    <Grid item xs>
      <Paper className={classes.paper}>
        <List
          disablePadding
          subheader={(
            <div className={classes.subheader}>
              <ListSubheader>{title} ({films.length} films)</ListSubheader>
              <Select
                className={classes.select}
                value={order}
                onChange={e => setOrder(e.target.value)}
                inputProps={{ name: 'order', id: 'film-order' }}
              >
                <MenuItem value='dateAdded'>Date added</MenuItem>
                <MenuItem value='name'>Name</MenuItem>
              </Select>
            </div>
          )}
        >
          {orderedFilms.map(film => <Film film={film} />)}
        </List>
      </Paper>
    </Grid>
  )
}

export default withStyles(styles)(
  connect(map, null)(FilmList)
)
