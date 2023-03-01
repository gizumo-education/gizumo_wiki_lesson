# Gizumo Wiki

## フォルダ構成

```
.
├── .vscode
├── docs
├── env
├── src
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── ...
│   │   │   └── Button.vue
│   │   ├── globals/
│   │   │   ├── ...
│   │   │   └── Header.vue
│   │   └── molecules/
│   │   │       ├── ...
│   │   │       └── ListSidebar.vue
│   │   └── pages/
│   │       ├── ...
│   │       └── index.vue
│   ├── js
│   │   ├── _helpers/
│   │   ├── _router/
│   │   ├── _store/
│   │   ├── stories/
│   │   └── app.js
│   ├── styles/
│   │   ├── fonts/
│   │   └── scss/
│   └── index.html
├── tools/
├── .enslintignore
├── .eslintrc
├── .gitattributes
├── .gitignore
├── jest.config.js
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

### 「JS」フォルダの中
- 「_helpers」はユーティリティな関数などをまとめているフォルダ
- 「_router」はvue-routerのインスタンスを生成しているフォルダ
- 「_store」はvuexのstoreのインスタンスを生成しているフォルダ

### コンポーネント管理

`components`フォルダでコンポーネントをまとめています。
- 「atoms」は使い回すための最小単位のコンポーネント
- 「globals」はどのページでも使うコンポーネント
- 「molecules」は「atoms」で構成されたコンポーネント（使い回せなくてもいい）

`pages`フォルダは`molecules`のコンポーネントで構成された実ページ
- 「pages」では直接「atoms」を使わない
- 「pages」では子のコンポーネントにpropsを渡すこと・イベントの通知を受け取ることとJSの処理を行っている

## 画面

|  | URL |
|---|---|
| トップ | `/` |
| サインイン | `/signin` |
| サインアウト | `/signout` |
| カテゴリー一覧・追加  | `/categories` |
| 記事一覧 | `/articles` |
| 記事詳細 | `/articles/:id` |
| 更新 | `/articles/:id/edit` |
| 投稿 | `/articles/post` |
| ユーザー一覧 | `/users` |
| ユーザー個別 | `/users/:id` |
| ユーザー作成 | `/users/create` |
| 404 | `/*` |

## サインアップ・サインイン
- 管理者が追加（アカウント名・メールアドレス・パスワード）

## 権限グループ

| グループ | 権限範囲 |
|---|---|
| システム管理者 | 閲覧（全ページ）、更新・削除 |
| 管理ユーザー | 閲覧（全ページ）、更新・削除 |
| 閲覧ユーザー | 閲覧（更新系のページを除く） |


## 開発

開発時は下記のコマンドでサーバーが立ち上がります。

```
npm install
```

```
npm run dev
```

## 技術的なもの

| [Vue](https://github.com/vuejs/vue) | [Vue Router](https://github.com/vuejs/vue-router) | [Vuex](https://github.com/vuejs/vuex) | [Storybook](https://storybook.js.org/) | [Jest](https://jestjs.io/ja/) | [ESlint](https://eslint.org/) | [Vite](https://ja.vitejs.dev/) | [node](https://nodejs.org/ja/) | [npm](https://www.npmjs.com/) |
| :----: | :-----: | :--------: | :----: | :-----: | :-----: | :-----: | :-----: | :-----: |
| 2.7.8 | 3.6.4 | 3.6.2 | 5.x.x | 24.7.x | 8.23.0 | 3.0.8  | 16.17.0 | 6.14.17 |