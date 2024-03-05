<template>
  <div class="category-edit">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      to="/categories"
      underline
      class="category-edit-back-list"
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <div class="article-edit-form">
      <app-input
        v-validate="'required'"
        name="name"
        type="text"
        placeholder="カテゴリー名を入力してください。"
        white-bg
        data-vv-as="カテゴリー名"
        :error-messages="errors.collect('name')"
        :value="categoryName"
        @update-value="$emit('edited-name', $event)"
      />
    </div>
    <app-button
      class="category-edit-submit"
      button-type="submit"
      round
      :disabled="!disabled"
      @click="handleSubmit"
    >
      {{ buttonText }}
    </app-button>
  </div>
</template>

<script>
import {
  Heading, Input, Button, RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
    appRouterLink: RouterLink,
  },
  props: {
    categoryName: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    access: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: { // 画面表示を替えたいとき
    buttonText() {
      if (!this.access.edit) return '更新権限がありません';
      return this.loading ? '更新中...' : '更新';
    },
    disabled() {
      return this.access.edit && !this.loading;
    },
  },
  methods: { // ユーザーのアクションに対して
    handleSubmit() {
      // 1
      if (!this.access.edit) return;
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('handle-submit');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.category-edit {
  &-back-list {
    margin-top: 10px;
  }
}
</style>
