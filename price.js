export function calculateTotal(price, taxRate) {
    return Math.floor(price * (100 + taxRate) / 100);
}

