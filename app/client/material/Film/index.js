import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo'
import { connect } from 'tiny-atom/react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/DeleteForever'
import CreateIcon from '@material-ui/icons/Create'
import MoreHoriz from '@material-ui/icons/MoreHoriz'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import DeleteFilmMutation from '../../graphql/DeleteFilmMutation.graphql'
import GetFilmsQuery from '../../graphql/GetFilmsQuery.graphql'

// TODO snackbars for success and failure of edit, move and delete

const actions = ['showFilmForm']

class Film extends Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    const { film } = this.props
    const { anchor } = this.state
    const { isFiction, isEnglishLanguage, name, dateAdded } = film
    const descriptor = `${
      isEnglishLanguage ? 'English' : 'Foreign'
    } language ${
      isFiction ? 'fiction' : 'documentary'
    }${dateAdded !== 'Invalid Date' ? ` - Added ${dateAdded}` : ''}`

    return (
      <ListItem>
        <ListItemText
          primary={name}
          secondary={descriptor}
        />
        <IconButton>
          <MoreHoriz
            onClick={(e) => this.setState({ anchor: e.currentTarget })}
          />
        </IconButton>
        <Menu
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={() => this.handleClose()}
        >
          {this.renderMenuItems()}
        </Menu>
      </ListItem>
    )
  }

  renderMenuItems () {
    return (
      <Fragment>
        {this.renderEditFilmItem()}
        {this.renderDeleteFilmItem()}
      </Fragment>
    )
  }

  renderEditFilmItem () {
    const { film, showFilmForm } = this.props

    return (
      <MenuItem onClick={() => {
        this.handleClose()
        showFilmForm({ show: true, action: 'update', film })
      }}>
        <ListItemIcon>
          <CreateIcon />
        </ListItemIcon>
        <ListItemText inset primary='Edit' />
      </MenuItem>
    )
  }

  renderDeleteFilmItem () {
    return (
      <Mutation
        mutation={DeleteFilmMutation}
        update={(cache, { data: { deleteFilm: deletedFilm } }) => {
          this.handleDeletedFilm(cache, deletedFilm.id)
        }}
      >
        {(deleteFilm, { data, loading, error }) => (
          <MenuItem onClick={() => this.deleteFilm(deleteFilm)}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText inset primary='Delete' />
          </MenuItem>
        )}
      </Mutation>
    )
  }

  deleteFilm (deleteFilm) {
    const { id } = this.props.film
    deleteFilm({
      variables: {
        id
      }
    })
  }

  handleDeletedFilm (cache, deletedFilmId) {
    const { films } = cache.readQuery({ query: GetFilmsQuery })
    cache.writeQuery({
      query: GetFilmsQuery,
      data: {
        films: films.filter(f => f.id !== deletedFilmId)
      }
    })
    this.handleClose()
  }

  handleClose () {
    this.setState({ anchor: null })
  }
}

export default connect(null, actions)(Film)
