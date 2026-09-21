import { test, expect } from "@playwright/test";

const cases = [
    { price: "1000", rate: "10", tax: "100", total: "1,100" },
    { price: "1000", rate: "8", tax: "80", total: "1,080" },
    { price: "99", rate: "10", tax: "9", total: "108" },
    { price: "0", rate: "10", tax: "0", total: "0" },
];

for (const { price, rate, tax, total } of cases) {
    test(`${price}円・税率${rate}%の結果を表示する`, async ({ page }) => {
        // 設定したbaseURLのトップページを開く
        await page.goto("./", { waitUntil: "networkidle" });

        // HTMLのlabelに書かれた名前で入力欄を探し、価格を入力する
        await page.getByLabel("税抜価格（円）").fill(price);

        // select要素のoptionのvalueで税率を選ぶ
        await page.getByLabel("税率", { exact: true }).selectOption(rate);

        // 利用者と同じように「計算する」ボタンをクリックする
        await page.getByRole("button", { name: "計算する" }).click();

        // 結果表示欄を取得する
        const result = page.locator("#result");

        // 表示が更新されるのを待ちながら、期待する文字列を検証する
        // 固定のsleepを入れなくても、Playwrightが繰り返し確認する
        await expect(result).toContainText(
            `税抜価格：${Number(price).toLocaleString("ja-JP")}円`,
        );
        await expect(result).toContainText(`消費税額：${tax}円`);
        await expect(result).toContainText(`税込価格：${total}円`);
    });
}