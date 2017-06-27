const express = require('express')
const app = express()
const server = require('http').createServer(app)

app.use(express.static('public'))

app.get('/', (request, response) => response.render('index.html'))

server.listen(3000, () => console.log('listening on port 3000'))
