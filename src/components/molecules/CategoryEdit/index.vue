<template>
  <div>
    <app-heading :level="1">
      カテゴリー管理
    </app-heading>
    <app-router-link
      to="/categories"
      underline
      hover-opacity
      class="category-edit__list-link"
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <app-text class="category-edit__category-name">
      ここにカテゴリー名表示
    </app-text>
    <app-button class="category-edit__update-button" round @click="test">
      更新
    </app-button>
  </div>
</template>

<script>
import {
  Button, Heading, RouterLink, Text,
} from '@Components/atoms';

export default {
  components: {
    appButton: Button,
    appHeading: Heading,
    appRouterLink: RouterLink,
    appText: Text,
  },
  created() {},
  methods: {
    test: () => console.log('テスト'),
  },
};
</script>

<style lang="scss" scoped>
.category-edit__list-link {
  margin-top: 16px;
}

.category-edit__category-name {
  border-bottom: solid 1px #eaeaea;
  padding: 3px 5px;
  padding-left: 15px;
  margin-top: 16px;
}
.category-edit__update-button {
  margin-top: 16px;
}
</style>
