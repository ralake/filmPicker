const filmService = require('../services/filmService')

module.exports = async function updateFilmHandler (request, response) {
  const { list, filmId } = request.params
  try {
    await filmService.delete(list, filmId)
    response.json({ ok: true })
  } catch (error) {
    response.json({ ok: false, error: error.message })
  }
}
