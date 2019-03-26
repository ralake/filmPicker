import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import { Mutation } from 'react-apollo'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Switch from '@material-ui/core/Switch'

import CreateFilmMutation from '../../graphql/CreateFilmMutation.graphql'
import GetFilmsQuery from '../../graphql/GetFilmsQuery.graphql'

const actions = ['showAddFilmDialog']

function map (state) {
  return {
    open: state.showAddFilmDialog
  }
}

class AddFilmDialog extends Component {
  constructor () {
    super()
    this.state = {
      film: this.getDefaultNewFilm()
    }
  }

  render () {
    const { open } = this.props
    return (
      <Mutation
        mutation={CreateFilmMutation}
        update={(cache, { data: { createFilm: createdFilm } }) => {
          this.addCreatedFilm(cache, createdFilm)
        }}
        onCompleted={() => this.handleCompleted()}
        onError={(e) => this.handleError(e)}
      >
        {(createFilm, { data, loading, error }) => {
          return (
            <Dialog
              open={open}
              fullWidth
              maxWidth='sm'
              onClose={() => this.handleClose()}
            >
              <DialogTitle>Add a film</DialogTitle>
              <DialogContent>
                {this.renderNameInput()}
                {this.renderListPicker()}
                {this.renderAttributePicker()}
                {this.renderActions(createFilm)}
              </DialogContent>
            </Dialog>
          )
        }}
      </Mutation>
    )
  }

  getDefaultNewFilm () {
    return {
      isEnglishLanguage: true,
      isFiction: true,
      isClareFriendly: false
    }
  }

  renderNameInput () {
    return (
      <TextField
        autoFocus
        margin='dense'
        label='Name'
        fullWidth
        onChange={(e) => this.updateFilm({ name: e.target.value })}
      />
    )
  }

  renderListPicker () {
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.film.parentList === 'WISH_LIST'}
              onChange={() => this.updateFilm({ parentList: 'WISH_LIST' })}
              color='primary'
            />
          }
          label='Wish list'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.film.parentList === 'WATCH_LIST'}
              onChange={() => this.updateFilm({ parentList: 'WATCH_LIST' })}
              color='primary'
            />
          }
          label='Watch list'
        />
      </FormGroup>
    )
  }

  renderAttributePicker () {
    const { isEnglishLanguage, isFiction, isClareFriendly } = this.state.film
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={!this.state.film.isEnglishLanguage}
              onChange={() => this.updateFilm({ isEnglishLanguage: !isEnglishLanguage })}
              color='primary'
            />
          }
          label='Foreign language?'
        />
        <FormControlLabel
          control={
            <Switch
              checked={!this.state.film.isFiction}
              onChange={() => this.updateFilm({ isFiction: !isFiction })}
              color='primary'
            />
          }
          label='Documentary?'
        />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.film.isClareFriendly}
              onChange={() => this.updateFilm({ isClareFriendly: !isClareFriendly })}
              color='primary'
            />
          }
          label='Clare friendly?'
        />
      </FormGroup>
    )
  }

  renderActions (createFilm) {
    const { film } = this.state
    const disabled = !film.name || !film.parentList

    return (
      <DialogActions>
        <Button
          onClick={() => this.handleClose()}
          color='primary'
        >
          Cancel
        </Button>
        <Button
          onClick={() => this.addFilm(createFilm)}
          color='primary'
          disabled={disabled}
        >
          Add film
        </Button>
      </DialogActions>
    )
  }

  updateFilm (update) {
    const { film } = this.state
    const updatedFilm = {
      ...film,
      ...update
    }

    this.setState({ film: updatedFilm })
  }

  handleClose () {
    this.props.showAddFilmDialog({ show: false })
    this.setState({ film: this.getDefaultNewFilm() })
  }

  addCreatedFilm (cache, createdFilm) {
    const { films } = cache.readQuery({ query: GetFilmsQuery })
    cache.writeQuery({
      query: GetFilmsQuery,
      data: {
        films: films.concat(createdFilm)
      }
    })
  }

  addFilm (createFilm) {
    const { film } = this.state

    createFilm({
      variables: {
        input: film
      }
    })
  }

  handleError () {
    // TODO show snack bar in error
    this.handleClose()
  }

  handleCompleted () {
    // TODO - show snackbar in success
    this.handleClose()
  }
}

export default connect(map, actions)(AddFilmDialog)
