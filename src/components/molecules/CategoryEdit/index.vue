<template>
  <div class="category-edit">
    <div v-if="doneMessage" class="category-edit__notice--update">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
    <div class="category-edit__columns">
      <section class="category-edit-editor">
        <app-heading :level="1">カテゴリー管理</app-heading>
        <app-notice
          class="notice"
          link-path="/categories"
          link-text="カテゴリー一覧へ戻る"
        />
        <div class="category-edit-form">
          <app-input
            v-validate="'required'"
            name="name"
            type="text"
            placeholder="カテゴリー名を入力してください。"
            white-bg
            data-vv-as="カテゴリー名"
            :error-messages="errors.collect('name')"
            :value="categoryName"
            @update-value="$emit('edit-value', $event)"
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
  </div>
</template>

<script>
import {
  Heading, Input, Button, Text,
} from '@Components/atoms';
import { Notice } from '@Components/molecules';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
    appText: Text,
    appNotice: Notice,
  },
  props: {
    categoryName: {
      type: String,
      required: true,
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
  &__columns {
    display: block;
    height: 100%;
  }
  &-editor {
    padding-right: 2%;
    width: 100%;
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
  &__notice--update {
    margin-bottom: 16px;
  }
  .notice {
    margin-top: 10px;
    text-align: left;
  }
}
</style>
