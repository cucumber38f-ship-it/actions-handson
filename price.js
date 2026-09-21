export function calculateTotal(price, taxRate) {
    return Math.floor(price * (100 + taxRate) / 100);
}

export function calculateTax(price, taxRate) {
    return calculateTotal(price, taxRate) - price;
}