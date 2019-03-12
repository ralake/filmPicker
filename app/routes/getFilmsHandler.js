const filmService = require('../services/filmService')

module.exports = async function getFilmsHandler (request, response) {
  const { list } = request.params
  const films = await filmService.get(list)

  response.json({ films })
}
