<template>
  <form class="category-edit" @submit.prevent="editCategory">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <div class="category-edit__back">
      <app-router-link
        block
        underline
        key-color
        hover-opacity
        to="/categories"
      >
        カテゴリー一覧へ戻る
      </app-router-link>
    </div>
    <div class="category-edit__form">
      <app-input
        v-validate="'required'"
        name="categoryName"
        type="text"
        placeholder="新しいカテゴリー名を入力してください。"
        white-bg
        data-vv-as="カテゴリー名"
        :error-messages="errors.collect('categoryName')"
        :value="categoryName"
        @update-value="$emit('edited-category', $event)"
      />
    </div>

    <app-button
      class="category-edit__submit"
      button-type="submit"
      round
      :disabled="!disabled"
      @click="handleSubmit"
    >
      {{ buttonText }}
    </app-button>
    <div
      v-if="doneMessage"
      class="category-edit__notice--update"
    >
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
    categoryId: {
      type: Number,
      default: 0,
    },
    categoryName: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    doneMessage: {
      type: String,
      default: '',
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
    editCategory() {
      if (!this.access.edit) return;
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('handle-submit');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.category-edit {
  &__back {
    margin-top: 20px;
  }
  &__form {
    margin-top: 20px;
  }
  &__submit {
    margin-top: 16px;
  }
  &__notice--update {
    margin-bottom: 16px;
  }
}
</style>
