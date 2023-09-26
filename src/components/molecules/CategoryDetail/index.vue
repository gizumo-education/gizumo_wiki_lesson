<template>
  <section class="categories-detail">
    <app-heading>カテゴリー管理</app-heading>
    <div class="categories-detail__back">
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
    <form class="categories-detail__form" @submit.prevent="editCategory">
      <div class="categories-detail__form__name">
        <app-input
          v-validate="'required'"
          :error-messages="errors.collect('name')"
          name="name"
          type="text"
          placeholder="カテゴリー名"
          data-vv-as="カテゴリー名"
          :value="category.name"
          @update-value="updateValue"
        />
      </div>
      <div class="categories-detail__form__submit">
        <app-button
          :disabled="disabled || !access.edit"
          button-type="submit"
        >
          {{ buttonText }}
        </app-button>
      </div>
    </form>
    <div v-if="errorMessage" class="categories-detail__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div v-if="doneMessage" class="categories-detail__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
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
    category: {
      type: Object,
      default: () => ({}),
    },
    access: {
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
  },
  computed: {
    buttonText() {
      if (!this.access.edit) return '作成権限がありません';
      return this.disabled ? '更新中...' : '更新';
    },
  },
  methods: {
    updateValue($event) {
      this.$emit('update-value', $event.target);
    },
    editCategory() {
      this.$emit('clear-message');
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$emit('edit-category');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.categories-detail {
  &__back {
    margin-top: 5px;
  }
  &__notice {
    margin-top: 5px;
  }
  &__form {
    margin: 0;
    margin-top: 5px;
    &__submit {
      margin-top: 10px;
    }
  }
}
</style>
