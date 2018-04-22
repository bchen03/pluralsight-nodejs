const assert = require("assert")
const cb = require("./3-callback")

cb.evenDoubler(2, (err, val, results, time) => {
    assert.strictEqual(results, 4, "2 * 2 = 4")
    assert.equal(err, null, "err == null")
})

assert.equal(cb.evenDoublerSync(2), 4, "assert(2 * 2 = 4)")
assert.throws(() => cb.evenDoublerSync(3), /Number not even/)