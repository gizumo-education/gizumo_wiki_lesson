<template>
  <div>
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      to="/categories"
      underline
      small
      hover-opacity
    >
      カテゴリー一覧に戻る
    </app-router-link>
    <app-input
      v-validate="'required'"
      name="category"
      type="text"
      white-bg
      data-vv-as="カテゴリー"
      :error-messages="errors.collect('category')"
      :value="currentCategoryName"
      @update-value="$emit('updated-category', $event)"
    />
    <br>
    <app-button
      button-type="submit"
      round
      :access="access"
      :disabled="disabled || !access.edit"
      @click="handleSubmit"
    >
      {{ buttonText }}
    </app-button>
    <div v-if="errorMessage" class="category-edit__notice">
      <app-text bg-error class="category-edit__message">
        {{ errorMessage }}
      </app-text>
    </div>
    <div v-if="doneMessage" class="category-edit__notice">
      <app-text bg-success class="category-edit__message">
        {{ doneMessage }}
      </app-text>
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
    currentCategoryName: {
      type: String,
      required: true,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    doneMessage: {
      type: String,
      default: '',
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
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('handle-submit');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.category-edit {
  &__notice {
    margin-top: 16px;
    width: auto;
  }
  &__message{
    display: inline-block;
    white-space: nowrap;
  }
}
</style>
