const createExpressPromiseRouter = require('express-promise-router')
const getFilmsHandler = require('./getFilmsHandler')
const createFilmHandler = require('./createFilmHandler')
const updateFilmHandler = require('./updateFilmHandler')
const deleteFilmHandler = require('./deleteFilmHandler')

module.exports = function createRoutes () {
  const router = createExpressPromiseRouter()

  router.get('/', (request, response) => response.render('index.html'))
  router.get('/api/lists/:list/films', getFilmsHandler)
  router.post('/api/lists/:list/films', createFilmHandler)
  router.put('/api/lists/:list/films/:filmId', updateFilmHandler)
  router.delete('/api/lists/:list/films/:filmId', deleteFilmHandler)

  return router
}
