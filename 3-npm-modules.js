
const request = require("request")

request("http://www.pluralsight.com", function(err, response, body) {
    if (!err && response.statusCode === 200) {
        console.log(body.length)
    }
})

