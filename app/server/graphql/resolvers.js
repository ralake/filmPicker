const filmService = require('../services/filmService')

const resolvers = {
  films (args) {
    return filmService.get()
  },
  pickFilm (args) {
    const { input } = args
    const { type, filter } = input
    return filmService.pick(type, filter)
  },
  createFilm (args) {
    const { input } = args
    return filmService.create(input)
  },
  updateFilm (args) {
    const { id, input } = args
    return filmService.update(id, input)
  },
  deleteFilm (args) {
    const { id } = args
    return filmService.delete(id)
  }
}

module.exports = resolvers
