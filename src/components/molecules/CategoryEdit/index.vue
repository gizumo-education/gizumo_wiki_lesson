<template>
  <section class="category-edit">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      class="category-edit__back"
      block
      underline
      key-color
      hover-opacity
      :to="`/categories`"
    >
      カテゴリー一覧へ戻る
    </app-router-link>

    <form @submit.prevent="updateCategory">
      <app-input
        v-validate="'required'"
        class="category-edit__input"
        name="categoryName"
        type="text"
        placeholder="カテゴリー名"
        data-vv-as="カテゴリー名"
        :error-messages="errors.collect('categoryName')"
        :value="categoryName"
        @update-value="$emit('edited-name', $event)"
      />

      <app-button
        class="category-edit__submit"
        button-type="submit"
        :disabled="disabled || !access.edit"
        round
      >
        {{ buttonText }}
      </app-button>

      <div v-if="errorMessage" class="category-edit__notice">
        <app-text bg-error>{{ errorMessage }}</app-text>
      </div>

      <div v-if="doneMessage" class="category-edit__notice">
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
    appButton: Button,
    appText: Text,
    appRouterLink: RouterLink,
  },
  props: {
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
    access: {
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
  &__back {
    margin-top: 16px;
  }
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
</style>
