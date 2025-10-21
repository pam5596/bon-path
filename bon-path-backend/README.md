# Bon-Path Backend
BonPathアプリケーションのバックエンド部分です。

## 環境構築
### 前提条件
- DockerとDocker Composeがインストールされていること
- Node.jsがインストールされており、`npm`および`npx`コマンドが使えること

### 手順
1. リポジトリをクローンし、プロジェクトディレクトリに移動する

```bash
$ git clone https://github.com/pam5596/bon-path.git
$ cd bon-path
```

2. Dockerコンテナを起動する。依存関係をインストール後、以下のコンテナが起動すれば成功

```bash
$ docker-compose up -d
[+] Running 2/2
 ✔ Container bon-path-database  Started
 ✔ Container bon-path-backend   Started

```

3. APIサーバーが起動していることを確認する

- APIサーバー（ポート8080）
下記URLにアクセスできることを確認する

http://localhost:8080/

- PostgreSQL（ポート5432）
SQLコンソールに入れることを確認する


```bash
$ docker compose exec database psql -U bonpath

psql (17.6 (Debian 17.6-1.pgdg13+1))
bonpath=# # Ctrl + Dで抜けられる
```

prismaのマイグレーションレコードが登録されていることを確認する

```bash
bonpath=# select table_schema, table_name from information_schema.tables;
    table_schema    |     table_name               
--------------------+--------------------
    public          | _prisma_migrations
    ... 
    
```

## 技術スタック:
### サードパーティサービス
サービス名 | バージョン | 用途
--- | --- | ---
`Node.js` | `v23.0` | JavaScriptランタイム
`PostgreSQL` | `v15.2` | データベース
`Docker` | `v20.10.24` | コンテナ仮想化
`Docker Compose` | `v2.17.2` | マルチコンテナ管理

### Node.jsライブラリ一覧
ライブラリ名 | バージョン | 用途
--- | --- | ---
`Hono` | `v4.9.2` | APIサーバーフレームワーク
`zod` | `v4.0.17` | バリデーションライブラリ
`prisma` | `v4.15.0` | ORM
`@prisma/client` | `v4.15.0` | ORMクライアント
`tsx` | `v4.20.4` | TypeScript実行環境
`vitest` | `v3.2.4` | テストフレームワーク
