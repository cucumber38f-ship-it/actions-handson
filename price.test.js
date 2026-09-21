const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateTotal } = require("./price");

test("1000円に税率10%を加えると、1100円になる", () => {
    assert.equal(calculateTotal(1000, 10), 1100);
});

test("1000円に税率50%を加えると、1500円になる", () => {
    assert.equal(calculateTotal(1000, 50), 1500);
})