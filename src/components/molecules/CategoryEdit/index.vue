<template>
  <div class="category-edit">
    <div v-if="doneMessage" class="category-edit__notice--update">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
    <div class="category-edit__contents">
      <section class="article-edit-editor">
        <app-heading :level="1">カテゴリー管理</app-heading>
        <app-router-link
          :to="`/category`"
          underline
          hover-opacity
          class="category-edit-editor-title"
        >
          カテゴリー一覧へ戻る
        </app-router-link>

        <form @submit.prevent="handleSubmit">
          <div class="category-edit-form">
            <app-input
              v-validate="'required'"
              name="title"
              type="text"
              :error-messages="errors.collect('title')"
              :value="categoryTitle"
              data-vv-as="カテゴリー"
              @update-value="$emit('edited-category-title', $event)"
            />
          </div>

          <app-button
            class="category-edit-submit"
            button-type="submit"
            round
            :disabled="!disabled"
          >
            {{ buttonText }}
          </app-button>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import {
  Heading, Input, Button, RouterLink, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
    appRouterLink: RouterLink,
    appText: Text,
  },
  props: {
    categoryId: {
      type: String,
      default: '',
    },
    categoryTitle: {
      type: String,
      default: '',
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
  &__contents {
    height: 100%;
  }
  &-editor {
    padding-right: 2%;
    width: 100%;
    border-right: 1px solid #ccc;
    &-title {
      margin-top: 16px;
      font-size: 13px;
    }
  }
  &-form {
    margin-top: 20px;
  }
  &-submit {
    margin-top: 16px;
  }
  &__notice--update {
    margin-bottom: 16px;
  }
}
</style>
