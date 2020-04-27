/* globals DOWNLOAD_SOURCES */

import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo'
import { connect } from 'tiny-atom/react'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/DeleteForever'
import CreateIcon from '@material-ui/icons/Create'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import FaceIcon from '@material-ui/icons/Face'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Link from '@material-ui/core/Link'

import lists from '../../lib/lists'
import DeleteFilmMutation from '../../graphql/DeleteFilmMutation.graphql'
import GetFilmsQuery from '../../graphql/GetFilmsQuery.graphql'

const actions = ['showFilmForm', 'showSnackbar']

const styles = theme => ({
  clareFriendlyChip: {
    marginRight: theme.spacing.unit
  }
})

class Film extends Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    const { film } = this.props
    const { name, imdbId } = film
    const descriptor = this.getDescriptor()
    const filmName = imdbId
      ? (
        <Link
          href={`https://www.imdb.com/title/${imdbId}/`}
          target='_blank'
          rel='noopener'
        >
          {film.name}
        </Link>
      )
      : name

    return (
      <ListItem divider>
        <ListItemText
          primary={filmName}
          secondary={descriptor}
        />
        {lists.isWatchList(film) && film.isClareFriendly && this.renderClareFriendlyChip()}
        {lists.isWishList(film) && this.renderDownloadLinks(film.name)}
        {this.renderMenu()}
      </ListItem>
    )
  }

  renderDownloadLinks (filmName) {
    return (
      <ButtonGroup variant='text' color='primary'>
        {
          DOWNLOAD_SOURCES.map(source => {
            const query = source.separator
              ? filmName.trim().replace(/\s/g, '+')
              : window.encodeURIComponent(filmName)
            const href = source.url.replace('{{film}}', query)
            return (
              <Button
                target='_blank'
                href={href}
              >
                {source.name}
              </Button>
            )
          })
        }
      </ButtonGroup>
    )
  }

  renderClareFriendlyChip () {
    const { classes } = this.props

    return (
      <Chip
        color='primary'
        icon={<FaceIcon />}
        label='Clare friendly'
        className={classes.clareFriendlyChip}
      />
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
          const list = lists.toDisplayName(deletedFilm.parentList)

          this.handleClose()
          this.showSnackbar({
            type: 'success',
            message: `Deleted ${deletedFilm.name} from ${list}!`
          })
        }}
        onError={() => {
          const { film } = this.props
          const list = lists.toDisplayName(film.parentList)

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

export default withStyles(styles)(
  connect(null, actions)(Film)
)
