const http = require("http")

function getGoogle() {
    console.log("==> Making GET call for google.com")
    http.get("http://www.google.com", function(res) {
        console.log("Status: " + res.statusCode)
        res.pipe(process.stdout)
    })
    // No need to call req.end() - only needed when doing post call
}

function getGoogleUsingRequest() {
    console.log("==> Making GET request for google.com")
    const req = http.request("http://www.google.com", function(res) {
        console.log("Status: " + res.statusCode)
        res.pipe(process.stdout)
    })
    req.end();
}

function getGoogleUsingRequestOptions() {
    console.log("==> Making GET request for google.com using options object")
    const options = {
        host: "www.google.com",
        port: 80,
        path: "/",
        method: "GET"
    }
    const req = http.request(options, function(res) {
        console.log("Status: " + res.statusCode)
        res.pipe(process.stdout)
    })
    req.end();
}

function getPluralsight() {
    console.log("==> Making GET call for pluralsight.com")
    http.get("http://www.pluralsight.com", function(res) {
        console.log("Status: " + res.statusCode)
        res.pipe(process.stdout)
    })
    // No need to call req.end() - only needed when doing post call
}

function getPluralsightUsingRequestOptions() {
    console.log("==> Making GET request for pluralsight.com using options object")
    const options = {
        host: "www.pluralsight.com",
        port: 80,
        path: "/",
        method: "GET"
    }
    const req = http.request(options, function(res) {
        console.log("Status: " + res.statusCode)
        res.pipe(process.stdout)
    })
    req.end();
}

//getGoogle()
//getGoogleUsingRequest();
//getGoogleUsingRequestOptions()
getPluralsight()
//getPluralsightUsingRequestOptions()
