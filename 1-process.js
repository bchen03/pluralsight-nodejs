function processInfo() {
    console.log("==> environment: " + JSON.stringify(process.env))
    console.log("==> arguments: " + process.argv)
    console.log("==> pid: " + process.pid)
    console.log("==> title: " + process.title)
    console.log("==> uptime: " + process.uptime())
    console.log("==> memory: " + JSON.stringify(process.memoryUsage()))
    console.log("==> cwd: " + process.cwd())
}

function processInStream() {
    process.stdin.resume()
    process.stdin.setEncoding("utf8")
    process.stdin.on("data", function(chunk) {
        //console.log("Chunk ==> " + chunk.toString())
        if (chunk.replace(/\r?\n$/, '') == "quit") {
        //if (chunk.trim() == "bye") {
            process.stdout.write("==> Quitting...")
            process.exit()
        }
        else {
            //console.log("false")
        }
        process.stdout.write("Chunk ==> " + chunk.toString())
    })
    process.stdin.on("end", function() {
        process.stdout.write("==> End!")
        process.exit()
    }) 
    process.on("SIGINT", function() {
        process.stdout.write("You're killing me")
        process.exit()
    })
    console.log("==> PID:" + process.pid)
}

//processInfo();
processInStream();