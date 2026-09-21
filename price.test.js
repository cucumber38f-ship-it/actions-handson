import test from "node:test";
import assert from "node:assert/strict";
import { calculateTotal } from "./price.js";

test("1000円・税率10%なら1100円", () => {
    assert.equal(calculateTotal(1000, 10), 1100);
});

test("1000円・税率8%なら1080円", () => {
    assert.equal(calculateTotal(1000, 8), 1080);
});

test("0円なら税込価格も0円", () => {
    assert.equal(calculateTotal(0, 10), 0);
});

test("1円未満の端数は切り捨てる", () => {
    assert.equal(calculateTotal(99, 10), 108);
});