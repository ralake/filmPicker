import React, { Component, Fragment } from 'react'
import { connect } from 'tiny-atom/react'
import capitalize from 'lodash-es/capitalize'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Switch from '@material-ui/core/Switch'

import lists from '../../lib/lists'

const actions = ['setFilmAction']

class FilmFormDialog extends Component {
  render () {
    const { action } = this.props
    return (
      <Fragment>
        <DialogTitle>{capitalize(action)} film</DialogTitle>
        <DialogContent>
          {this.renderNameInput()}
          {this.renderListPicker()}
          {this.renderAttributePicker()}
          {this.renderActions()}
        </DialogContent>
      </Fragment>
    )
  }

  handleChange (update) {
    const { film } = this.props

    this.props.onChange({
      ...film,
      ...update
    })
  }

  renderNameInput () {
    return (
      <TextField
        autoFocus
        margin='dense'
        label='Name'
        fullWidth
        onChange={(e) => this.handleChange({ name: e.target.value })}
        value={this.props.film.name}
      />
    )
  }

  renderListPicker () {
    const { film } = this.props
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={lists.isWishList(film)}
              onChange={() => this.handleChange({ parentList: lists.WISH_LIST })}
              color='primary'
            />
          }
          label='Wish list'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={lists.isWatchList(film)}
              onChange={() => this.handleChange({ parentList: lists.WATCH_LIST })}
              color='primary'
            />
          }
          label='Watch list'
        />
      </FormGroup>
    )
  }

  renderAttributePicker () {
    const { isEnglishLanguage, isFiction, isClareFriendly } = this.props.film
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={!isEnglishLanguage}
              onChange={() => this.handleChange({ isEnglishLanguage: !isEnglishLanguage })}
              color='primary'
            />
          }
          label='Foreign language?'
        />
        <FormControlLabel
          control={
            <Switch
              checked={!isFiction}
              onChange={() => this.handleChange({ isFiction: !isFiction })}
              color='primary'
            />
          }
          label='Documentary?'
        />
        <FormControlLabel
          control={
            <Switch
              checked={isClareFriendly}
              onChange={() => this.handleChange({ isClareFriendly: !isClareFriendly })}
              color='primary'
            />
          }
          label='Clare friendly?'
        />
      </FormGroup>
    )
  }

  renderActions (createFilm) {
    const { film, action, onConfirm, onClose } = this.props
    const disabled = !film.name || !film.parentList

    return (
      <DialogActions>
        <Button
          onClick={() => onClose()}
          color='primary'
        >
          Cancel
        </Button>
        <Button
          onClick={() => onConfirm(film)}
          color='primary'
          disabled={disabled}
        >
          {capitalize(action)} film
        </Button>
      </DialogActions>
    )
  }
}

export default connect(null, actions)(FilmFormDialog)
