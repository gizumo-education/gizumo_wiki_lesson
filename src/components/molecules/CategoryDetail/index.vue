<template>
  <div class="category-detail">
    <form class="category-detail__info" @submit.prevent="editCategory">
      <app-heading>
        カテゴリー管理
      </app-heading>

      <app-router-link
        :to="`/categories`"
        underline
        hover-opacity
      >
        カテゴリー一覧に戻る
      </app-router-link>

      <app-input
        type="text"
        :value="category.name"
        @update-value="updateValue"
      />
      <app-button
        button-type="submit"
        round
        :disabled="disabled || !access.edit"
      >
        {{ buttonText }}
      </app-button>
    </form>

    <div v-if="errorMessage">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div v-if="doneMessage">
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
    category: {
      type: Object,
      default: () => ({}),
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
      if (!this.access.edit) return '変更権限がありません';
      return this.disabled ? '更新中です...' : '更新';
    },
  },
  methods: {
    updateValue($event) {
      if (!this.access.edit) return;
      this.$emit('clear-message');
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('update-value', $event.target);
      });
    },
    editCategory() {
      this.$emit('edit-category');
    },
  },
};
</script>

<style lang="scss" scoped>
.category-detail * {
    margin-top: 20px;
}
</style>
