import createAtom from 'tiny-atom'
import actions from './actions'

export const INITIAL_STATE = {
  films: [],
  snackbar: {},
  filmForm: {}
}

export default createAtom(INITIAL_STATE, actions)
