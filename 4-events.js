const request = require("request")
const gzip = require("zlib")
const fs = require("fs")

var handleResults = function(err, val, results, time) {
    if (err) {
        console.error("(" + val + ") " + err.message + " (" + time + " ms)");
    }
    else {
        console.log("(" + val + ") The results are: " + results + " (" + time + " ms)");
    }
};

// Stream Pluralsight home page in chunks
// const r = request("http://www.pluralsight.com")

// r.on("data", function(chunk) {
//     console.log("=====> Start Chunk")
//     console.log(chunk)
//     console.log("=====> End Chunk")
// })

// r.on("end", function() {
//     console.log("=====> End")
// })

// Write to stdout stream
//process.stdout.write("Hello")
//process.stdout.write("World")

// Pipe readable stream to writable stream
//request("http://www.pluralsight.com").pipe(process.stdout)

//
console.log("=> Running gzip and streaming to file")
request("http://www.pluralsight.com")
    .pipe(gzip.createGzip())
    .pipe(fs.createWriteStream("pluralsight.gzip"))


setTimeout(() => {
    console.log("=> Reading gzipped file and streaming to console")
    fs.createReadStream("pluralsight.gzip")
        .pipe(gzip.createGunzip())
        .pipe(process.stdout)
}, 2000)
