const filmService = require('../services/filmService')

const resolvers = {
  films (args) {
    return filmService.get()
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
