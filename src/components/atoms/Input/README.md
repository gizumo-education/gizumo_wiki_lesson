# Inputコンポーネント

## 使用方法

- フォーム実装時に使用するコンポーネントです
- フロント側のバリデーションにvee-validateプラグインを使用しています。(<span style="color: red">Storybook上だとプラグインがうまく動作しない模様</span>)  
  [vee-validateについて](https://baianat.github.io/vee-validate/)

## props

### スタイルの変更

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|whiteBg|Boolean|false|`true` or `false`|`true`だと背景色が白になります|

### インターフェースの変更

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|name|String|inputName|任意の文字列|inputタグに適用したいname属性の値を指定します|
|type|String|'text'|`text`, `checkbox`, `textarea`, `radio`, `password`, `file`,`hidden`, `submit`, `reset`, `button`, `image`|inputタグに適用したいname属性の値を指定します|
|required|Boolean|false|`true` or `false`|入力項目が必須かどうか指定します|
|placeholder|String|入力してください|任意の文字列|placeholder属性の値を指定します|

### 値の設定

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|name|String|inputName|任意の文字列|inputタグに適用したいname属性の値を指定します|
|value|String|''|任意の文字列|inputタグのvalueをバインディングしているpropsです|
|vvas|String|''|任意の文字列|`vee-validate`プライグインのバリデーションエラー時に表示される文言のフィールド名を指定します。|