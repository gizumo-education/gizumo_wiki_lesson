# Modalコンポーネント

## 使用方法

グローバルコンポーネント(pages/index.vue)に`app-modal`カスタムタグとして登録しているので、各コンポーネントで`<app-modal></app-modal>`と記述することで使用することができます。

### 表示ロジックについて

ルートのVueインスタンスに対して`Modal/index.vue`内で`toggleModal`イベントの登録を行なっています。

```javascript
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  beforeMount() {
    //↓ここでイベントの登録
    this.$root.$on('toggleModal', this.handleToggleModal);
  },
  methods: {
    handleToggleModal() {
      this.isOpen = !this.isOpen;
    },
  },
};
```

モーダルの開閉に関しては、`_helpers/mixins.js`に定義している`toggleModal`を実行します。各コンポーネントの`mixins`に対して`_helpers/mixins.js`を指定して使用してください。

`_helpers/mixins.js`内の`toggleModal`メソッドは、ルートのVueインスタンスに対して`toggleModal`を`emit`しています。

### 使用例

```javascript
import Mixins from '@Helpers/mixins';
export default {
  mixins: [Mixins],
  methods: {
    openModal() {
      //'@Helpers/mixins'に定義しているtoggleModalメソッドの実行
      this.toggleModal();
    },
  },
}

```