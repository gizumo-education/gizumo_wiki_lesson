<template>
  <form @submit.prevent="addCategory">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-input
      v-validate="'required'"
      name="category"
      type="text"
      placeholder="追加するカテゴリー名を入力してください"
      data-vv-as="カテゴリー名"
      :error-messages="errors.collect('category')"
      :value="category"
      @update-value="$emit('update-value', $event)"
    />
    <app-button
      class="category-management-post__submit"
      button-type="submit"
      round
      :disabled="disabled || !access.create"
    >
      {{ buttonText }}
    </app-button>

    <div v-if="errorMessage" class="category-management-post__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div v-if="doneMessage" class="category-management-post__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </form>
</template>
<script>
import {
  Heading, Input, Button, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
    appText: Text,
  },
  props: {
    category: {
      type: String,
      required: true,
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
      if (!this.access.create) return '作成権限がありません';
      return this.disabled ? '作成中...' : '作成';
    },
  },
  methods: {
    addCategory() {
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
</style>
