<template>
  <form>
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      class="category-management-edit__return"
      :to="`/categories`"
      hover-opacity
    >
      カテコリ一ー覧へ戻る
    </app-router-link>
    <div class="category-management-edit__input">
      <app-input
        v-validate="'required'"
        name="title"
        type="text"
        placeholder="カテゴリー名を入力してください"
        data-vv-as="カテゴリー名"
        :error-messages="errors.collect('title')"
        :value="categoryName"
        @update-value="$emit('edited-category', $event)"
      />
    </div>
    <app-button
      class="category-management-edit__submit"
      button-type="submit"
      round
      :disabled="!disabled"
      @click.prevent="handleSubmit"
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
    categoryName: {
      type: String,
      default: '',
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
  &__return {
    margin-top: 16px;
    text-decoration:underline;
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
