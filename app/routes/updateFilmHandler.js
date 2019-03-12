const filmService = require('../services/filmService')

module.exports = async function updateFilmHandler (request, response) {
  const { list, filmId } = request.params

  try {
    const film = await filmService.update(list, filmId, request.body)
    response.json({ ok: true, film })
  } catch (error) {
    response.json({ ok: false, error: error.message })
  }
}
