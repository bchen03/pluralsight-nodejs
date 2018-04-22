const util = require('./util');
const randomTime = require('./util').randomTime;

const maxTime = 1000;

var handleResults = function(err, val, results, time) {
    if (err) {
        console.error("(" + val + ") " + err.message + " (" + time + " ms)");
    }
    else {
        console.log("(" + val + ") The results are: " + results + " (" + time + " ms)");
    }
};

var evenDoubler = function(val, callback) {
    const random = util.randomTime(maxTime);    // randomTime(maxTime);

    setTimeout(function() {
        if (val % 2 === 0) {
            callback(null, val, val * 2, random);
        }
        else {
            callback(new Error("Number not even"), val, null, random);
        }
    }, 
    random);
};

var evenDoublerSync = function(val) {
    const random = util.randomTime(maxTime);    // randomTime(maxTime);
    if (val % 2 === 0) {
        return val * 2
    }
    else {
        throw new Error("Number not even")
    }
};


// for (var i = 0; i < 10; i++) {
//     evenDoubler(i, handleResults);
// }

// console.log("-----");

module.exports.evenDoubler = evenDoubler
module.exports.evenDoublerSync = evenDoublerSync
