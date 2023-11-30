<template>
  <div class="category-update">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      class="category-management-post__detail"
      :to="`/categories`"
      underline
      hover-opacity
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <app-input
      v-validate="'required'"
      name="category"
      type="text"
      data-vv-as="カテゴリー名"
      :error-messages="errors.collect('category')"
      :value="categoryName"
      @update-value="$emit('update-value', $event)"
    />
    <app-button
      class="category-management-post__submit"
      button-type="submit"
      round
      :disabled="disabled || !access.edit"
      @click="handleSubmit"
    >
      {{ buttonText }}
    </app-button>

    <div v-if="errorMessage" class="category-management-post__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div v-if="doneMessage" class="category-management-post__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </div>
</template>

<script>
import {
  Heading, Input, RouterLink, Button, Text,
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
    categories: {
      type: Array,
      default() {
        return [];
      },
    },
    updateCategory: {
      type: String,
      default: '',
    },
    categoryName: {
      type: String,
      default: '',
    },
    doneMessage: {
      type: String,
      default: '',
    },
    errorMessage: {
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
    loading: {
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
    handleSubmit() {
      if (!this.access.edit) return;
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('handle-submit');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.category-management-post {
  &__input {
    margin-top: 20px;
  }
  &__submit {
    margin-top: 20px;
  }
  &__notice {
    margin-top: 20px;
  }
  &__detail {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
