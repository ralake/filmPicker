const createApp = require('./createApp')
const port = process.env.PORT || 5000

const app = createApp()

app.start(port)
