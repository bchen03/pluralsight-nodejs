// https://medium.freecodecamp.org/node-js-child-processes-everything-you-need-to-know-e69498fe970a

const { spawn } = require("child_process")

const child = spawn("pwd")

child.stdout.on("data", data => {
    console.log(`child data: ${data.toString().trim()}`)
})

child.on("exit", (code, signal) => {
    console.log(`child exited with code: ${code}, signal: ${signal}`)
})

