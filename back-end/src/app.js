const expressServer = require("express")

const router = require("./router.js")

const app = expressServer()

app.use(router)

module.exports = app