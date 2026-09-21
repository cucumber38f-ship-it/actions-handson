import { mkdir, copyFile, rm } from "node:fs/promises";

const files = ["index.html", "app.js", "price.js"];

// distディレクトリ配下を削除
await rm("dist", { recursive: true, force: true });

// distディレクトリを作成する
await mkdir("dist", { recursive: true });

for (const file of files) {
    await copyFile(file, `dist/${file}`);
}

console.log("公開用ファイルをdistに出力しました");