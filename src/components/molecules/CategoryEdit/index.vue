<template>
  <div class="article-edit">
    <div v-if="doneMessage" class="article-edit__notice--update">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
    <div class="article-edit__columns">
      <section class="article-edit-editor">
        <app-heading :level="1">カテゴリー管理</app-heading>
        <app-router-link
          block
          underline
          key-color
          hover-opacity
          to="/categories"
        >
          カテゴリー一覧へ戻る
        </app-router-link>

        <div class="article-edit-form">
          <app-input
            v-validate="'required'"
            name="title"
            type="text"
            placeholder="カテゴリー名を入力してください。"
            white-bg
            data-vv-as="カテゴリー"
            :error-messages="errors.collect('title')"
            :value="articleTitle"
            @update-value="$emit('edited-category', $event)"
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
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
</style>
