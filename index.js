const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const server = require('http').createServer(app)

app.use(express.static('public'))
app.get('/', (request, response) => response.render('index.html'))

server.listen(PORT, () => console.log(`listening on port: ${PORT}`))
