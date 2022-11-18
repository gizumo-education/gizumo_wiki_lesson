<template>
  <div class="article-edit">
    <div v-if="doneMessage" class="article-edit__notice--update">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
    <div class="article-edit__columns">
      <section class="article-edit-editor">
        <app-heading :level="1">記事の更新</app-heading>
        <app-heading
          class="article-edit-editor-title"
          :level="2"
        >
          カテゴリーの選択
        </app-heading>

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
  Heading, MarkdownPreview, Textarea, Input, Button, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appTextarea: Textarea,
    appMarkdownPreview: MarkdownPreview,
    appInput: Input,
    appButton: Button,
    appText: Text,
  },
  props: {
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
</style>
