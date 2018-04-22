const http = require("http")
const app = require("./app")

const port = process.env.port || 3006

const server = http.createServer(app)

server.listen(port)

console.log(`==> Web server on port ${port} started...`)
