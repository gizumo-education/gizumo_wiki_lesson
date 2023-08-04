<template>
  <section>
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      class="update-info-input"
      block
      underline
      key-color
      hover-opacity
      :to="'/categories'"
    >
      カテゴリー一覧へ戻る
    </app-router-link>

    <form @submit.prevent="updateCategory">
      <app-input
        v-validate="'required'"
        class="update-info-input"
        name="category"
        type="text"
        :value="category"
        :error-messages="errors.collect('category')"
        @update-value="$emit('update-value', $event)"
      />
      <app-button
        class="update-info-input"
        button-type="submit"
        round
        :disabled="!disabled"
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
  </section>
</template>

<script>
import {
  Text,
  Input,
  Button,
  Heading,
  RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appText: Text,
    appInput: Input,
    appButton: Button,
    appHeading: Heading,
    appRouterLink: RouterLink,
  },
  props: {
    category: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
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
    updateCategory() {
      // console.log(this.$validator);
      if (!this.access.edit) return;
      this.$emit('clear-message');
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('up-date-category');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.update-info-input {
  margin-top: 15px;
}
</style>
