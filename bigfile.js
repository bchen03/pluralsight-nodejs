// From https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93

const fs = require("fs")
const http = require("http")

function createBigFile() {
    const file = fs.createWriteStream("./bigfile.txt")
    for (let i = 0; i <= 100000; i++) {
        file.write(`Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
            qui officia deserunt mollit anim id est laborum.\n`);
      }
      
      file.end();
}

function serveBigFileAllAtOnce() {
    const server = http.createServer()
    server.on("request", function(req, res) {
        fs.readFile("./bigfile.txt", (err, data) => {
            if (err) throw err
            res.end(data)
        })
    })
    server.listen(8000)
}

function serveBigFileStreamed() {
    const server = http.createServer()
    server.on("request", function(req, res) {
        const src = fs.createReadStream("./bigfile.txt")
        src.pipe(res)
    })
    server.listen(8000)
}


//createBigFile()
//serveBigFileAllAtOnce()
serveBigFileStreamed()



