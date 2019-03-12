import actions from './actions'

function evolve (get, split, action) {
  const { type } = action
  actions[type](get, split, action)
}

export default evolve
