const express = require('express')
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')

const rawSchema = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

module.exports = function createApp () {
  const app = express()
  const schema = buildSchema(rawSchema)

  app.use(express.static('public'))

  app.get('/', (request, response) => response.render('index.html'))

  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  }))

  return {
    start: (port) => {
      return app.listen(port, () => console.log(`Server listening on port ${port}`))
    }
  }
}
