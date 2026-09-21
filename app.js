import { calculateTotal, calculateTax } from "./price.js";

const form = document.querySelector("#calculator");
const priceInput = document.querySelector("#price");
const taxRateInput = document.querySelector("#tax-rate");
const result = document.querySelector("#result");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const price = Number(priceInput.value);
    const taxRate = Number(taxRateInput.value);
    const total = calculateTotal(price, taxRate);
    const tax = calculateTax(price, taxRate);
    const yen = (value) => `${value.toLocaleString("ja-JP")}円`;

    result.textContent = [
        `税抜価格：${yen(price)}`,
        `消費税額：${yen(tax)}`,
        `税込価格：${yen(total)}`,
    ].join("\n");
});
