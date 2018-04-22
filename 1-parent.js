const cp = require("child_process")

const child = cp.fork(__dirname + "/1-child.js")

child.on("message", function(message) {
    console.log("PARENT got message: " + JSON.stringify(message))
})

child.send({ hello: "World"})
