<template>
  <div class="category-edit">
    <div class="category-edit__columns">
      <section class="category-edit-editor">
        <app-heading :level="1">カテゴリー管理</app-heading>
        <div class="categoryList__back">
          <app-router-link
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
            name="name"
            type="text"
            white-bg
            :error-messages="errors.collect('name')"
            :value="editDetail"
            @update-value="inputCategory"
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
    <div v-if="errorMessage" class="category-edit__notice--update">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
    <div v-if="doneMessage" class="category-edit__notice--update">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </div>
</template>

<script>
import {
  Heading, RouterLink, Input, Button, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
    appInput: Input,
    appButton: Button,
    appText: Text,
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
    access: {
      type: Object,
      default: () => ({}),
    },
    editDetail: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    doneMessage: {
      type: String,
      default: '',
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
    inputCategory($event) {
      this.$emit('update-value', $event.target);
    },
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
    height: 100%;
  }
  &-editor {
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
    margin-top: 16px;
  }
}
.categoryList__back {
  margin-top: 16px;
}
</style>
