<template>
  <div class="category-edit">
    <div class="category-edit__columns">
      <section class="category-edit-editor">
        <app-heading :level="1">カテゴリーの更新</app-heading>
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
        <div class="category-edit-form">
          <app-input
            v-validate="'required'"
            name="title"
            type="text"
            placeholder="カテゴリーのタイトルを入力してください。"
            white-bg
            data-vv-as="カテゴリーのタイトル"
            :value="categoryTitle"
            :error-messages="errors.collect('title')"
            @update-value="$emit('edited-title', $event)"
          />
        </div>
        <app-button
          class="category-edit-submit"
          button-type="submit"
          round
          :disabled="!disabled"
          @click="handleSubmit"
        >
          {{ buttonText }}
        </app-button>
      </section>
    </div>
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
    categoryTitle: {
      type: String,
      default: '',
    },
    categoryList: {
      type: Array,
      default: () => [],
    },
    categories: {
      type: Array,
      default() {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
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
.category-edit {
  &__back {
    margin-top: 20px;
  }
  &__columns {
    height: 100%;
  }
  &-editor {
    padding-right: 2%;
    width: 100%;
    border-right: 1px solid #ccc;
    &-title {
      margin-top: 16px;
    }
  }
  &-form {
    margin-top: 20px;
  }
  &-submit {
    margin-top: 16px;
  }
  &__notice {
    margin-top: 16px;
  }
}
</style>
