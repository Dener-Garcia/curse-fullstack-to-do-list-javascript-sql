const expressServer = require("express")
const cors = require("cors")

const router = require("./router")

const app = expressServer()

app.use(cors())
app.use(expressServer.json())
app.use(router)

module.exports = app
