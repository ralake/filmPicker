const filmService = require('../services/filmService')

const resolvers = {
  films (args) {
    return filmService.get()
  },
  async createFilm (args) {
    const createdFilm = await filmService.create(args.input)
    return createdFilm
  }
}

module.exports = resolvers
