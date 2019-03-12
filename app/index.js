const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const createRoutes = require('./routes')

const app = express()
const PORT = process.env.PORT || 5000
const server = http.createServer(app)

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(createRoutes())

server.listen(PORT, () => console.log(`listening on port: ${PORT}`))
