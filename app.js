import { calculateTotal } from "./price.js";

const form = document.querySelector("#calculator");
const priceInput = document.querySelector("#price");
const taxRateInput = document.querySelector("#tax-rate");
const result = document.querySelector("#result");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const price = Number(priceInput.value);
    const taxRate = Number(taxRateInput.value);
    const total = calculateTotal(price, taxRate);

    result.textContent = `税込価格：${total.toLocaleString("ja-JP")}円`;
});