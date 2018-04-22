//
//  Function returning EventEmitter
//
const events = require("events")

// Define function returning EventEmitter
const getResource = function(maxCount) {
    const e = new events.EventEmitter()
    
    //setTimeout(() => {
    process.nextTick(() => {
        e.emit("start")

        let i = 0;

        const interval = setInterval(() => {
            e.emit("data", i++)

            if (i === maxCount) {
                e.emit("end", maxCount)
                clearInterval(interval)
            }
        }, 
        500)

    })
    //}, 10)

    return e;
}

// Invoke function and get back EventEmitter
const r = getResource(10)

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

