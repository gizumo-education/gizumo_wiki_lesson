<template>
  <form class="category-management-edit" @submit.prevent="editCategory">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      block
      underline
      key-color
      hover-opacity
      to="/categories"
      class="category-management-edit__back"
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <app-input
      v-validate="'required'"
      class="category-management-edit__input"
      name="category"
      type="text"
      placeholder="カテゴリー名を入力してください。"
      white-bg
      data-vv-as="カテゴリー"
      :error-messages="errors.collect('category')"
      :value="categoryName"
      @update-value="$emit('edited-category', $event)"
    />
    <app-button
      class="category-management-edit__submit"
      button-type="submit"
      round
      :disabled="disabled || !access.create"
    >
      {{ buttonText }}
    </app-button>
    <div v-if="errorMessage" class="category-management-edit__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
    <div v-if="doneMessage" class="category-management-edit__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </form>
</template>

<script>
import {
  Heading, Input, Button, Text, RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
    appText: Text,
    appRouterLink: RouterLink,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    categoryId: {
      type: Number,
      default: 0,
    },
    categoryName: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    doneMessage: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonText() {
      if (!this.access.edit) return '更新権限がありません';
      return this.disabled ? '更新中...' : '更新';
    },
  },
  methods: {
    editCategory() {
      if (!this.access.create) return;
      this.$emit('clear-message');
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('handle-submit');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.category-management-edit {
  &__submit {
    margin-top: 16px;
  }
  &__back {
    margin-top: 16px;
  }
  &__input {
    margin-top: 16px;
  }
  &__notice {
    margin-top: 16px;
  }
}
</style>
