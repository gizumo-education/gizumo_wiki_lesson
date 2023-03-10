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

        <!-- 内容を書き換えるところ -->
        <div class="category-edit-form">
          <app-input
            v-validate="'required'"
            name="category"
            type="text"
            :error-messages="errors.collect('category')"
            :value="categoryName"
            data-vv-as="カテゴリー"
            @update-value="$emit('edited-category-title', $event)"
          />
        </div>

        <!-- 更新ボタン -->
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
  </div>
</template>

<script>
import {
  Heading, Input, Button, RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
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
    categoryList: {
      type: Array,
      default: () => [],
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
    handleSubmit(categoryId) {
      if (!this.access.edit) return;
      this.$validator.validate().then(valid => {
        console.log('更新ボタン押せた');
        console.log(categoryId);
        if (valid) this.$emit('handle-submit');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.category-edit {
  &__contents {
    display: flex;
    height: 100%;
  }
  &-editor {
    padding-right: 2%;
    width: 50%;
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
