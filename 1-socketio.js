const http = require("http")
const socketio = require("socket.io")
const fs = require("fs")

const handler = function(req, res) {
    //
    fs.readFile(__dirname + "/index.html", function(err, data) {
        if (err) {
            res.writeHead(500)
            res.end("Error loading idex.html")
        }
        else {
            res.writeHead(200)
            res.end(data)
        }
    })
}

const app = http.createServer(handler)
const io = socketio.listen(app)

io.sockets.on("connection", function(socket) {
    //
    setInterval(function() {
        const timestamp = Date.now()
        console.log("Emitted: " + timestamp)
        socket.emit("timer", timestamp)
    }, 2000)
    //
    socket.on("submit", function(data) {
        console.log("Submitted: " + data)
    })
})

app.listen(8080)

console.log("Server running!")

