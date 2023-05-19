<template>
  <section class="category-edit">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <div class="category-edit__back">
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
    <form class="category-edit__title">
      <div class="category-edit__title__name">
        <app-input
          v-validate="'required'"
          name="category"
          type="text"
          data-vv-as="カテゴリー名"
          :value="categoryName"
          @update-value="updateValue"
        />
      </div>
      <div v-if="errorMessage" class="category-edited__notice">
        <app-text bg-error>{{ errorMessage }}</app-text>
      </div>
      <div v-if="doneMessage" class="category-edited__notice">
        <app-text bg-success>{{ doneMessage }}</app-text>
      </div>
    </form>
    <app-button
      class="category-edit-submit"
      button-type="submit"
      round
      :disabled="disabled"
      @click="handleSubmit"
    >
      {{ buttonText }}
    </app-button>
  </section>
</template>

<script>
import {
  Heading,
  RouterLink,
  Input,
  Button,
  Text,
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
    loading: {
      type: Boolean,
      default: false,
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    categoryName: {
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonText() {
      if (!this.access.create) return '更新権限がありません';
      return this.disabled ? '更新中...' : '更新';
    },
  },
  methods: {
    updateValue($event) {
      this.$emit('clear-message');
      this.$emit('update-value', $event);
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
  &__back {
    margin-top: 20px;
  }
  &__title {
    margin-top: 20px;
  }
  &-submit {
    margin-top: 16px;
  }
  &__notice {
    margin-top: 16px;
  }
}
</style>
