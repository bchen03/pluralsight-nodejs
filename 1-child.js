
process.on("message", function(message) {
    console.log("CHILD got message: " + JSON.stringify(message))
    process.exit(0)
})

process.send({ foo: "bar" })

