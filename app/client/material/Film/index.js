import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/DeleteForever'
import CreateIcon from '@material-ui/icons/Create'
import SendIcon from '@material-ui/icons/Send'
import MoreHoriz from '@material-ui/icons/MoreHoriz'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import DeleteFilmMutation from '../../graphql/DeleteFilmMutation.graphql'
import UpdateFilmMutation from '../../graphql/UpdateFilmMutation.graphql'
import GetFilmsQuery from '../../graphql/GetFilmsQuery.graphql'

// TODO snackbars for success and failure of edit, move and delete

export default class Film extends Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    const { film } = this.props
    const { anchor } = this.state
    const { isFiction, isEnglishLanguage, name } = film
    const descriptor = `${isEnglishLanguage ? 'English' : 'Foreign'} language ${isFiction ? 'fiction' : 'documentary'}`

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
        {this.renderMoveFilmItem()}
        {this.renderDeleteFilmItem()}
      </Fragment>
    )
  }

  renderEditFilmItem () {
    return (
      <MenuItem>
        <ListItemIcon>
          <CreateIcon />
        </ListItemIcon>
        <ListItemText inset primary='Edit' />
      </MenuItem>
    )
  }

  renderMoveFilmItem () {
    const showMoveIcon = this.props.film.parentList === 'WISH_LIST'

    if (!showMoveIcon) return null

    return (
      <Mutation
        mutation={UpdateFilmMutation}
        onCompleted={() => this.handleClose()}
      >
        {(updateFilm, { data, loading, error }) => (
          <MenuItem onClick={() => this.moveFilm(updateFilm)}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary='Move' />
          </MenuItem>
        )}
      </Mutation>
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

  moveFilm (updateFilm) {
    const { film } = this.props
    updateFilm({
      variables: {
        id: film.id,
        input: {
          parentList: 'WATCH_LIST',
          dateAdded: new Date().toDateString()
        }
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
