<template>
  <div class="article-edit">
    <div v-if="doneMessage" class="article-edit__notice--update">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
    <div class="article-edit__columns">
      <section class="article-edit-editor">
        <app-heading :level="1">の更新</app-heading>
        <app-heading
          class="article-edit-editor-title"
          :level="2"
        >
          カテゴリーの選択
        </app-heading>
        <app-select
          v-validate="'required'"
          name="category"
          :error-messages="errors.collect('category')"
          :value="currentCategoryName"
          @update-value="$emit('selected-article-category', $event)"
        >
          <option
            v-for="(category) in categoryList"
            :key="category.id"
            :value="category.name"
          >
            {{ category.name }}
          </option>
        </app-select>
        <app-heading
          class="article-edit-editor-title"
          :level="2"
        >
          タイトル・本文の更新
        </app-heading>
        <div class="article-edit-form">
          <app-input
            v-validate="'required'"
            name="title"
            type="text"
            placeholder="記事のタイトルを入力してください。"
            white-bg
            data-vv-as="記事のタイトル"
            :error-messages="errors.collect('title')"
            :value="articleTitle"
            @update-value="$emit('edited-title', $event)"
          />
        </div>

        <div class="article-edit-form">
          <app-textarea
            v-validate="'required'"
            name="content"
            placeholder="記事の本文をマークダウン記法で入力してください。"
            white-bg
            data-vv-as="記事の本文"
            :error-messages="errors.collect('content')"
            :value="articleContent"
            @update-value="$emit('edited-content', $event)"
          />
        </div>
        <app-button
          class="article-edit-submit"
          button-type="submit"
          round
          :disabled="!disabled"
          @click="handleSubmit"
        >
          {{ buttonText }}
        </app-button>
      </section>

      <article class="article-edit-preview">
        <app-markdown-preview
          :markdown-content="markdownContent"
        />
      </article>
    </div>
  </div>
</template>

<script>
import {
  Heading, MarkdownPreview, Textarea, Input, Button, Select, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appTextarea: Textarea,
    appMarkdownPreview: MarkdownPreview,
    appInput: Input,
    appButton: Button,
    appSelect: Select,
    appText: Text,
  },
  props: {
    articleId: {
      type: Number,
      default: 0,
    },
    articleTitle: {
      type: String,
      default: '',
    },
    articleContent: {
      type: String,
      default: '',
    },
    markdownContent: {
      type: String,
      default: '',
    },
    currentCategoryName: {
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
.article-edit {
  &__columns {
    display: flex;
    height: 100%;
  }
  &-editor {
    padding-right: 2%;
    width: 50%;
    border-right: 1px solid #ccc;
    &-title {
      margin-top: 16px;
    }
  }
  &-preview {
    margin-left: 2%;
    width: 48%;
    overflow-y: scroll;
    background-color: #fff;
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
