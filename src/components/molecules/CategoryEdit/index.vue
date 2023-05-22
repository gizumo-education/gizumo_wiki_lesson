<template>
  <div class="category-edit">
    <div v-if="doneMessage" class="category-edit__notice--update">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
    <div class="category-edit__columns">
      <section class="category-edit-editor">
        <app-heading :level="1">カテゴリー管理</app-heading>
        <app-router-link
          block
          underline
          key-color
          hover-opacity
          to="/categories"
          class="category-edit-editor-back"
        >
          カテゴリー一覧へ戻る
        </app-router-link>
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
            @update-value="$emit('category-name', $event)"
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
  Heading,
  Input,
  Button,
  Text,
  RouterLink,
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
  &__columns {
    display: flex;
    height: 100%;
  }
  &-editor {
    padding-right: 2%;
    width: 50%;
    border-right: 1px solid #ccc;
    &-back {
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
