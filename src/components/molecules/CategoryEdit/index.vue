<template>
  <form @submit.prevent="handleSubmit">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <div class="category-edit__back">
      <app-router-link
        class="category-edit__back__link"
        to="/categories"
      >
        カテゴリー一覧に戻る
      </app-router-link>
    </div>
    <app-input
      v-validate="'required'"
      name="category"
      type="text"
      placeholder="新しいカテゴリー名を入力してください"
      data-vv-as="カテゴリー名"
      :error-messages="errors.collect('category')"
      :value="category"
      @update-value="$emit('update-value', $event)"
    />
    <app-button
      class="category-management-edit__submit"
      button-type="submit"
      round
      :disabled="disabled || !access.create"
    >
      {{ buttonText }}
    </app-button>

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
    category: {
      type: String,
      required: true,
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
      if (!this.access.create) return '更新権限がありません';
      return this.disabled ? '更新中...' : '更新';
    },
  },
  methods: {
    handleSubmit() {
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
.category-edit {
  &__back {
    margin-top: 20px;

    &__link {
      text-decoration: underline;
    }
  }
}
</style>
