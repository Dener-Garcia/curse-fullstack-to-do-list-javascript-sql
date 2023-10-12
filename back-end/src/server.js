const app = require("./app")
const dotenv = require("dotenv")


dotenv.config()

const portServer = process.env.PORT || 3002

app.listen(portServer, () => console.log(`Servidor rodando na porta ${portServer}`))

