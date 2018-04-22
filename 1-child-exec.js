
const exec = require("child_process").exec;

// To run OS command as a child process
const child = exec("hostname", (err, stdout, stderr) => {
    console.log("<== err: " + err + ", stdout: " + stdout + ", stderr: " + stderr + " ==>")
    if (err) {
        console.log("ERROR: " + stderr)
    }
    else {
        console.log("RESULT: " + stdout)
    }
})

console.log("CHILD PID: " + child.pid)