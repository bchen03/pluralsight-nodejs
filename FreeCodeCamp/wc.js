// 1. Word count using exec() to buffer input
function exec_wc() {
    const { exec } = require("child_process")

    //console.log("process.env: " + JSON.stringify(process.env))

    exec("echo Hello World | wc.exe", (err, stdout, stderr) => {
        if (stderr) {
            console.log(`Error: ${err}`)
        }
        else {
            console.log(`Number of lines: ${stdout}`)
        }
    })
}

exec_wc()

// 2. Word count using spawn(); pipe the input into this script:
//
//    echo Hello World | node ec.js
//
//    Running "node wc.js" doesn't work on Windows since there is 
//    no equivalent to CTRL-D to terminate input
function spawn_wc() {
    const { spawn } = require("child_process")

    const child = spawn("wc")

    process.stdin.pipe(child.stdin)
    
    child.stdout.on('data', (data) => {
        console.log(`child stdout:\t${data}`);
    });
}

//spawn_wc()

// Word count against a file - uses stream
function stream_file_wc(file) {
    const fs = require("fs")

    let words = 0;
    
    const src = fs.createReadStream(file, { highWaterMark: 2000 })
    
    src.on("data", chunk => {
        //console.log("Chunk: " + chunk)
        this.prevChunk = this.prevChunk || ""   // initialize 
    
        let arr = String(this.prevChunk + chunk).replace("\r", "").split(/[ \n]/)
        this.prevChunk = (arr.length > 0 && arr[arr.length-1] !== "") ? arr.pop() : ""
    
        words += arr.reduce((acc, curr) => {
            //console.log("==> " + curr)
            return acc += !curr ? 0 : 1
        }, 0)
    })
    
    src.on("end", () => {
        console.log(`File: ${file}, Words: ${words}`)
    })
}

//stream_file_wc("../smallfile.txt")

