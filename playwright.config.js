import { defineConfig } from "@playwright/test";

const remoteURL = process.env.BASE_URL?.trim();

const baseURL = remoteURL
    ? `${remoteURL.replace(/\/+$/, "")}`
    : "http://127.0.0.1:4173/";


export default defineConfig({
    // ブラウザ用テストを置くフォルダ
    testDir: "./e2e",

    // 1テストが止まったままにならないよう、30秒で失敗にする
    timeout: 30_000,

    // 今回は順番に実行し、ログを追いやすくする
    workers: 1,

    // CIにtest.onlyが残ると他のテストが省かれるため、エラーにする
    forbidOnly: Boolean(process.env.CI),

    // 失敗をそのまま確認するため、自動再試行はしない
    retries: 0,

    reporter: [
        // ターミナルにテスト結果を出す
        ["list"],

        // 詳細をHTMLに保存する。実行後に勝手にブラウザは開かない
        ["html", { open: "never" }],
    ],

    use: {
        // page.goto("/")のアクセス先
        baseURL,

        // インストールしたChromiumで検証する
        browserName: "chromium",

        // 失敗時の画面を残し、CIでも何が表示されたか確認できるようにする
        screenshot: "only-on-failure",

        // 操作履歴や画面の変化を記録し、失敗した場合だけ保存する
        trace: "retain-on-failure",
    },

    webServer: remoteURL
        ? undefined
        : {
            // 毎回ビルドし、実際に公開するdistを配信する
            // &&は「ビルドに成功した場合だけサーバーを起動する」の意味
            command: 
                "npm run build && npx http-server dist -a 127.0.0.1 -p 4173 -c-1",

            // テスト開始前にサーバーが接続可能になるまで待つ
            url: baseURL,

            // このURLが応答するまで待ってからテストを始める
            reuseExistingServer: false,

            // サーバー起動を待つ上限
            timeout: 60_000,
        },
});
