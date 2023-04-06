<template>
  <form @submit.prevent="editCategory">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      class="category-management-edit__link"
      underline
      small
      hover-opacity
      :to="`/categories`"
    >
      <span @click="clearEditedValue">カテゴリー一覧へ戻る</span>
    </app-router-link>
    <app-input
      v-validate="'required'"
      name="category"
      type="text"
      placeholder="更新するカテゴリー名を入力してください"
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
  RouterLink,
  Heading,
  Input,
  Button,
  Text,
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
    access: {
      type: Object,
      default: () => ({}),
    },
    category: {
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
    doneMessage: {
      type: String,
      default: '',
    },
  },
  computed: {
    buttonText() {
      if (!this.access.edit) return '更新権限がありません';
      return this.disabled ? '更新中...' : '更新';
    },
  },
  methods: {
    clearEditedValue() {
      this.$emit('clear-edited-value');
    },
    editCategory() {
      if (!this.access.edit) return;
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('edit-category');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.category-management-edit {
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
