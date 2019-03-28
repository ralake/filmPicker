/* globals HD_DOWNLOAD_URL */

import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo'
import { connect } from 'tiny-atom/react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/DeleteForever'
import CreateIcon from '@material-ui/icons/Create'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import FaceIcon from '@material-ui/icons/Face'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import lists from '../../lib/lists'
import DeleteFilmMutation from '../../graphql/DeleteFilmMutation.graphql'
import GetFilmsQuery from '../../graphql/GetFilmsQuery.graphql'

const actions = ['showFilmForm', 'showSnackbar']

class Film extends Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    const { film } = this.props
    const descriptor = this.getDescriptor()

    return (
      <ListItem divider>
        <ListItemText
          primary={film.name}
          secondary={descriptor}
        />
        {this.renderClareFriendlyChip()}
        {this.renderDownloadButton()}
        {this.renderMenu()}
      </ListItem>
    )
  }

  renderClareFriendlyChip () {
    const { film } = this.props
    if (!film.isClareFriendly || lists.isWishList(film)) return null

    return (
      <Chip
        label='Clare friendly'
        color='primary'
        icon={<FaceIcon />}
        variant='outlined'
      />
    )
  }

  renderDownloadButton () {
    const { film } = this.props
    if (lists.isWatchList(film)) return null

    return (
      <IconButton onClick={() => this.search()}>
        <OpenInNewIcon />
      </IconButton>
    )
  }

  renderMenu () {
    const { anchor } = this.state
    return (
      <Fragment>
        <IconButton onClick={(e) => this.setState({ anchor: e.currentTarget })}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={() => this.handleClose()}
        >
          {this.renderMenuItems()}
        </Menu>
      </Fragment>
    )
  }

  getDescriptor () {
    const { isEnglishLanguage, isFiction, dateAdded } = this.props.film
    return `${
      isEnglishLanguage ? 'English' : 'Foreign'
    } language ${
      isFiction ? 'fiction' : 'documentary'
    }${dateAdded !== 'Invalid Date' ? ` - Added ${dateAdded}` : ''}`
  }

  search () {
    const film = window.encodeURIComponent(this.props.film.name)
    const url = HD_DOWNLOAD_URL.replace('{{film}}', film)
    window.open(url, '_blank')
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
        onCompleted={(data) => {
          const { deleteFilm: deletedFilm } = data
          const list = lists.toDisplayName(deletedFilm)

          this.handleClose()
          this.showSnackbar({
            type: 'success',
            message: `Deleted ${deletedFilm.name} from ${list}!`
          })
        }}
        onError={() => {
          const { film } = this.props
          const list = lists.toDisplayName(film)

          this.handleClose()
          this.showSnackbar({
            type: 'error',
            message: `Error trying to delete ${film.name} from ${list}`
          })
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

  showSnackbar ({ message, type }) {
    this.props.showSnackbar({
      show: true,
      duration: 3000,
      message,
      type
    })
  }
}

export default connect(null, actions)(Film)
