const createApp = require('./server/createApp')
const port = process.env.PORT || 5000

const app = createApp()

app.start(port)
