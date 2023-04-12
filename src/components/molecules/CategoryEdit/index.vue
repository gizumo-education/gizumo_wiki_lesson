<template>
  <div class="category-edit">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      underline
      hover-opacity
      :to="'/categories'"
      class="category-edit__back-link"
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <app-input
      v-validate="'required'"
      name="category"
      type="text"
      placeholder="追加するカテゴリー名を入力してください"
      data-vv-as="カテゴリー名"
      :error-messages="errors.collect('category')"
      :value="editCategory.name"
      class="category-edit__form"
      @update-value="$emit('editing-name', $event)"
    />
    <app-button
      class="category-edit__submit"
      button-type="submit"
      round
      :disabled="!disabled"
      @click="handleSubmit"
    >
      {{ buttonText }}
    </app-button>
    <div v-if="errorMessage" class="category-edit__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div v-if="doneMessage" class="category-edit__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </div>
</template>

<script>
import {
  Heading, RouterLink, Input, Button, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
    appInput: Input,
    appButton: Button,
    appText: Text,
  },
  props: {
    editCategory: {
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
    updateValue($event) {
      this.$emit('update-value', $event.target);
    },
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
  .category-edit {
    &__back-link {
      margin-top: 16px;
    }
    &__form {
      margin-top: 20px;
    }
    &__submit {
      margin-top: 16px;
    }
    &__notice {
      margin-top: 16px;
    }
  }
</style>
