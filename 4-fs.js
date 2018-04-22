//
// Create a file, rename it, and print stats and contents 
//
const fs = require("fs")
const os = require("os")

//
console.log("arch: " + os.arch)
console.log("cpus: " + os.cpus().map(item => JSON.stringify(item) + ", "))
console.log("tot mem: " + os.totalmem)
console.log("free mem: " + os.freemem)
console.log("home dir: " + os.homedir)
console.log("==>>>>>>>>>>>>>\n")

if (fs.existsSync("temp")) {
    console.log("Deleting temp dir")
    if (fs.existsSync("temp/new.txt")) {
        fs.unlinkSync("temp/new.txt")
    }

    fs.rmdirSync("temp")
}

// synchronous
// fs.mkdirSync("temp")
// if (fs.existsSync("temp")) {
//     process.chdir("temp")
//     fs.writeFileSync("test.txt", "This is a test file")
//     fs.renameSync("test.txt", "new.txt")
//     console.log("File has size: " + fs.statSync("new.txt").size + " bytes")
//     console.log("File contents: " + fs.readFileSync("new.txt").toString())
// }

// asynchronous
fs.mkdir("temp", err => {
    process.chdir("temp")
    fs.writeFile("test.txt", "This is a test file", err => {
        fs.rename("test.txt", "new.txt", err => {
            fs.stat("new.txt", (err, stats) => {
                console.log("File has size: " + stats.size + " bytes")
                fs.readFile("new.txt", (err, data) => {
                    console.log("File contents: " + data.toString())
                })
            })
        })
    })
})



