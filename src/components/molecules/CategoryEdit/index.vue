<template>
  <div class="category-edit">
    <section class="category-edit-editor">
      <app-heading :level="1">カテゴリー管理</app-heading>
      <div class="category-edit__back">
        <app-router-link
          block
          underline
          key-color
          hover-opacity
          to="/categories"
        >
          カテゴリー一覧へ戻る
        </app-router-link>
      </div>
      <div class="category-name-edit-form">
        <form @submit.prevent="updateCategory">
          <app-input
            v-validate="'required'"
            name="categoryName"
            type="text"
            placeholder="編集するカテゴリー名"
            white-bg
            data-vv-as="編集するカテゴリー名"
            :error-messages="errors.collect('categoryName')"
            :value="categoryName"
            @update-value="$emit('edited-category-name', $event)"
          />
          <app-button
            class="category-edit-submit"
            button-type="submit"
            round
            :disabled="!disabled"
            @click="handleSubmit"
          >
            {{ buttonText }}
          </app-button>
        </form>

        <div v-if="errorMessage" class="category-edit__notice">
          <app-text bg-error>{{ errorMessage }}</app-text>
        </div>

        <div v-if="doneMessage" class="category-edit__notice">
          <app-text bg-success>{{ doneMessage }}</app-text>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  Heading, Button, Input, RouterLink, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appButton: Button,
    appInput: Input,
    appRouterLink: RouterLink,
    appText: Text,
  },
  props: {
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
    loading: {
      type: Boolean,
      default: false,
    },
    access: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    buttonText() {
      if (!this.access.edit) return '更新権限がありません';
      return this.loading ? '更新中...' : '更新';
    },
    disabled() {
      return this.access.edit && !this.loading;
    },
  },
  methods: {
    handleSubmit() {
      if (!this.access.edit) return;
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('handle-submit');
      });
    },
    updateCategory() {
      if (!this.access.edit) return;
      this.$emit('clear-message');
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('update-category');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.category-edit {
  &__back{
    margin-top: 16px;
  }
  &-form {
    margin-top: 20px;
  }
  &-submit {
    margin-top: 16px;
  }
  &__notice {
    margin-top: 16px;
  }
}
</style>
