//
//  Inheriting from EventEmitter
//
const events = require("events")
const util = require("util")

// Constructor to create EventEmitter derived function
function Resource(maxCount) {
    const self = this

    process.nextTick(() => {
        self.emit("start")

        let i = 0;

        const interval = setInterval(() => {
            self.emit("data", i++)

            if (i === maxCount) {
                self.emit("end", maxCount)
                clearInterval(interval)
            }
        }, 
        500)
    })
}

// Inheritance using Node util.inherits
util.inherits(Resource, events.EventEmitter)

// Invoke constructor
const r = new Resource(10)

// Subscribe to events
r.on("start", function() {
    console.log("started")
})

r.on("end", function(e) {
    console.log("ended: " + e)
})

r.on("data", function(r) {
    console.log("==> data: " + r)
})


