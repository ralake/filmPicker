const filmService = require('../services/filmService')

module.exports = async function createFilm (request, response) {
  const { list } = request.params
  try {
    const film = await filmService.create(list, request.body)
    response.json({ ok: true, film })
  } catch (error) {
    response.json({ ok: false, error: error.message })
  }
}
