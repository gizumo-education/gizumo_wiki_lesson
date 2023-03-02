# ListSidebarコンポーネント

## 使用方法

サイドバーのリストに使用するコンポーネントです

## props

### スタイルの変更
|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|className|String|''|---|スタイル制御に使用します|

## 値の設定

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|targetArray|Array|[]|Array|配列内にリストをクリックしたときの遷移先をオブジェクトで指定します|

### example・・・targetArray

```javascript
[
  {
    id: 1,
    name: 'HOME',
    path: '/',
  },
  {
    id: 2,
    name: '記事',
    path: '/all/articles',
  },
  {
    id: 3,
    name: 'カテゴリー',
    path: '/category',
  },
  {
    id: 4,
    name: 'ユーザー',
    path: '/users',
  },
]
```