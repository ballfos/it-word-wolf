## 実行

1. 用語を格納したデータベース`iww.db`を用意する．

2. `iww.db`を`iww.sql`に変換する．

  ```sh
  sqlite3 iww.db .dump > iww.sql
  ```

3. ローカルデータベースにデータを挿入する．

  ```sh
  npx wrangler d1 execute iww-db --file iww.sql
  ```

4. サーバを立ち上げる

   ```sh
   npm run dev
   ```
