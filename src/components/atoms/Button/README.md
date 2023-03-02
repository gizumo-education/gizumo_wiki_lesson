# Buttonコンポーネント

## 使用方法

ボタン実装時に使用するコンポーネントです

## props

### スタイルの変更

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|buttonType|String|`button`|---|buttonタグのtype属性の値をバインディングします|
|desplay|Boolean|false|`true` or `false`|---|
|round|Boolean|false|`true` or `false`|---|

### 種別の変更

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|error|Boolean|false|`true` or `false`|`error`ボタンを使用するときに指定します|
|disabled|Boolean|false|`true` or `false`|`disabled`ボタンを使用するときに指定します|
|caution|Boolean|false|`true` or `false`|`caution`ボタンを使用するときに指定します|


### サイズの変更

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|small|Boolean|false|`true` or `false`|ボタンのサイズを小さくするときに使用します|
|large|Boolean|false|`true` or `false`|ボタンのサイズを大きくするときに使用します|
