<template>
  <div class="category-edit">
    <div class="category-edit__columns">
      <section class="category-edit-editor">
        <app-heading :level="1">カテゴリーの管理</app-heading>
        <app-router-link
          underline
          hover-opacity
          to="/categories"
        >
          カテゴリー一覧に戻る
        </app-router-link>
        <div class="category-edit-form">
          <app-input
            v-validate="'required'"
            name="category"
            type="text"
            data-vv-as="カテゴリー名"
            :error-messages="errors.collect('category')"
            :value="currentCategoryName"
            @update-value="$emit('update-value', $event)"
          />
        </div>

        <app-button
          class="category-edit-submit"
          button-type="submit"
          round
          :disabled="disabled || !access.create"
          @click="handleSubmit"
        >
          {{ buttonText }}
        </app-button>
        <div v-if="errorMessage" class="category-management-post__notice">
          <app-text bg-error>{{ errorMessage }}</app-text>
        </div>

        <div v-if="doneMessage" class="category-management-post__notice">
          <app-text bg-success>{{ doneMessage }}</app-text>
        </div>
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
    currentCategoryName: {
      type: String,
      default: '',
    },
    doneMessage: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonText() {
      if (!this.access.edit) return '更新権限がありません';
      return this.disabled ? '更新中...' : '更新';
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
}
.category-management-post__notice {
  width: 20%;
}
</style>
