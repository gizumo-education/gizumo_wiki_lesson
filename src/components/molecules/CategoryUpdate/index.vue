<template>
  <div class="category-update">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      :to="`/categories`"
      underline
      hover-opacity
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <app-input
      v-validate="'required'"
      class="category-update__input"
      name="name"
      type="formData"
      data-vv-as="カテゴリー名"
      :error-messages="errors.collect('name')"
      :value="categoryName"
      @update-value="$emit('edit-name', $event)"
    />
    <app-button
      class="category-update__button"
      :disabled="!disabled"
      round
      @click="handleSubmit"
    >
      {{ buttonText }}
    </app-button>

    <div v-if="errorMessage" class="category-update__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div v-if="doneMessage" class="category-update__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </div>
</template>

<script>
import {
  RouterLink, Heading, Input, Button, Text,
} from '@Components/atoms';

export default {
  components: {
    appRouterLink: RouterLink,
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
    appText: Text,
  },
  props: {
    updateCategory: {
      type: Object,
      default: () => ({}),
    },
    categoryName: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
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
    handleSubmit(updateCategory) {
      if (!this.access.edit) return;
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('handle-submit', updateCategory.id);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.category-update {
  &__notice {
    display:flex;
    margin-top: 16px;
  }
  .router-link {
    padding-top: 16px;
  }
  &__input {
    margin-top: 16px;
  }
  &__button {
    margin-top: 16px;
  }
}
</style>
