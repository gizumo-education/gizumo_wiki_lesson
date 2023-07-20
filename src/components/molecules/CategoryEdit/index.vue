<template>
  <section class="category-edit">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <div class="category-edit-preview">
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
        name="name"
        type="text"
        white-bg
        data-vv-as="カテゴリー名"
        :error-messages="errors.collect('name')"
        :value="category.name"
        @update-value="$emit('update-value', $event.target)"
      />
      <app-button
        class="category-edit-submit"
        button-type="submit"
        round
        :disabled="disabled || !access.edit"
        @click="handleSubmit"
      >
        {{ buttonText }}
      </app-button>
      <div v-if="errorMessage" class="category-edit__notice">
        <app-text bg-error>{{ errorMessage }}</app-text>
      </div>

      <div v-if="doneMessage" class="category-edit__notice">
        <app-text bg-success>{{ doneMessage }}</app-text>
      </div>
    </div>
  </section>
</template>

<script>
import {
  Heading,
  Button,
  Input,
  Text,
  RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appInput: Input,
    appText: Text,
    appHeading: Heading,
    appButton: Button,
    appRouterLink: RouterLink,
  },
  props: {
    errorMessage: {
      type: String,
      default: '',
    },
    doneMessage: {
      type: String,
      default: '',
    },
    category: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
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
      return this.disabled ? '更新中...' : '更新';
    },
  },
  methods: {
    handleSubmit() {
      if (!this.access.edit) return;
      this.$emit('clear-message');
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
  &-preview {
    width: 48%;
    margin-top: 20px;
    overflow-y: scroll;
    background-color: #fff;
  }
  &-form {
    margin-top: 10px;
  }
  &-submit {
    margin-top: 16px;
    margin-bottom: 16px;
  }
  &__notice--update {
    margin-bottom: 16px;
  }
}
</style>
