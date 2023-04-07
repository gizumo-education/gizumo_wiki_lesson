<template>
  <section class="category-edit">
    <app-heading :level="1">カテゴリーの更新</app-heading>
    <div class="category-edit-link">
      <app-router-link
        key-color
        underline
        hover-opacity
        to="/categories"
      >
        カテゴリー一覧へ戻る
      </app-router-link>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="category-edit-item">
        <app-input
          v-validate="'required'"
          name="name"
          type="text"
          placeholder="カテゴリー名を入力してください。"
          :error-messages="errors.collect('name')"
          :value="category.name"
          @update-value="$emit('update-value', $event)"
        />
      </div>
      <div class="category-edit-item">
        <app-button
          button-type="submit"
          round
          :disabled="!disabled"
        >
          {{ buttonText }}
        </app-button>
      </div>
      <div v-if="errorMessage" class="category-edit-notice">
        <app-text bg-error>{{ errorMessage }}</app-text>
      </div>
      <div v-if="doneMessage" class="category-edit-update">
        <app-text bg-success>{{ doneMessage }}</app-text>
      </div>
    </form>
  </section>
</template>

<script>
import {
  Heading, Input, Button, Text, RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appRouterLink: RouterLink,
    appButton: Button,
    appText: Text,
  },
  props: {
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
    category: {
      type: Object,
      default: () => ({}),
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
      this.$emit('handle-submit', this.category);
    },
  },
};
</script>

<style lang="scss" scoped>
  .category-edit {
    &-link {
      margin-top: 16px;
    }
    &-item {
      margin-top: 16px;
    }
    &-update {
      margin-top: 16px;
    }
  }
</style>
