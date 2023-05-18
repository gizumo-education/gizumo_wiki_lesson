<template>
  <form @submit.prevent="putCategory">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      class="category-edit__link"
      underline
      hover-opacity
      :to="`/categories`"
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <app-input
      v-validate="'required'"
      class="category-edit__input"
      name="category"
      type="text"
      placeholder="編集するカテゴリー名を入力してください"
      data-vv-as="カテゴリー名"
      :error-messages="errors.collect('category')"
      :value="categoryName"
      @update-value="$emit('update-value', $event)"
    />
    <app-button
      class="category-edit__submit"
      button-type="submit"
      round
      :disabled="disabled || !access.create"
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
    access: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
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
  },
  computed: {
    buttonText() {
      if (!this.access.create) return '更新権限がありません';
      return this.disabled ? '更新中...' : '更新';
    },
  },
  methods: {
    putCategory() {
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
.category-edit {
  &__link {
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
