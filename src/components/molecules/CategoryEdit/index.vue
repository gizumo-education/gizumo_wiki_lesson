<template>
  <form @submit.prevent="editCategory">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      class="category-all-link"
      to="/categories"
      round
      underline
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <app-input
      v-validate="'required'"
      name="categoryName"
      type="text"
      placeholder="カテゴリー名"
      data-vv-as="カテゴリー名"
      :value="category.name"
      :error-messages="errors.collect('categoryName')"
      @update-value="$emit('update-value', $event)"
    />
    <app-button
      class="category-management-post__submit"
      button-type="submit"
      :disabled="disabled || !access.edit"
      round
    >
      {{ buttonText }}
    </app-button>

    <div v-if="editCategoryErrorMessage" class="category-management-post__notice">
      <app-text bg-error>{{ editCategoryErrorMessage }}</app-text>
    </div>

    <div v-if="editCategoryDoneMessage" class="category-management-post__notice">
      <app-text bg-success>{{ editCategoryDoneMessage }}</app-text>
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
    editCategoryErrorMessage: {
      type: String,
      default: '',
    },
    editCategoryDoneMessage: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    category: {
      type: Object,
      default: () => ({}),
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
      if (!this.access.edit) return;
      this.$emit('clear-message');
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('edit-category');
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.category-management-post {
  &__input {
    margin-top: 16px;
  }
  &__submit {
    margin-top: 16px;
  }
  &__notice {
    margin-top: 16px;
  }
}
.category-all-link {
  margin-top: 16px;
}
</style>
