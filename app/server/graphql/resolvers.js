const filmService = require('../services/filmService')

const resolvers = {
  films (args) {
    return filmService.get()
  },
  async createFilm (args) {
    const createdFilm = await filmService.create(args.input)
    return createdFilm
  },
  async updateFilm (args) {
    const { id, input } = args
    const updatedFilm = await filmService.update(id, input)
    return updatedFilm
  },
  async deleteFilm (args) {
    const { id } = args
    const deletedFilm = await filmService.delete(id)
    return deletedFilm
  }
}

module.exports = resolvers
