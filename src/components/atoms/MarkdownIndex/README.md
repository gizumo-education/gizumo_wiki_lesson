# MarkdownIndexコンポーネント

## 使用方法

マークダウン記事の目次に使用するコンポーネントです

## props

### markdownIndexesについて

配列にオブジェクトを格納していくのですが、オブジェクトの値に関してはページ内アンカーに必要な情報を定義しています

スムーススクロールの処理については、`vue-smoothscroll`を使用しています。

[https://github.com/Teddy-Zhu/vue-smoothscroll](https://github.com/Teddy-Zhu/vue-smoothscroll)

|key|valueのtype|説明|
|---|---|---|---|
|tagName|String|見出しのhtmlタグのレベルを指定します|
|val|String|スクロール先の対象要素のid属性の値を指定します|
|title|String|見出しのテキストを指定します|
|scrollToY|Number|ページのスクロール位置を指定します|