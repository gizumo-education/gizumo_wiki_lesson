<template>
  <section class="categories-edit">
    <app-heading :level="1">カテゴリー管理</app-heading>

    <div class="categories-edit__back">
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

    <form class="categories-edit__text" @submit.prevent="editCategory">
      <div class="categories-edit__text__input">
        <app-input
          v-validate="'required'"
          name="categoryName"
          type="text"
          placeholder="カテゴリー名"
          data-vv-as="カテゴリー名"
          :error-messages="errors.collect('categoryName')"
          :value="category.name"
          @update-value="updateValue"
        />
      </div>

      <div class="categories-edit__text__submit">
        <app-button
          button-type="submit"
          :disabled="disabled || !access.edit"
          round
        >
          {{ buttonText }}
        </app-button>
      </div>
    </form>

    <div v-if="errorMessage" class="categories-edit__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div v-if="doneMessage" class="categories-edit__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </section>
</template>

<script>
import {
  Heading,
  Button,
  Text,
  Input,
  RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appButton: Button,
    appText: Text,
    appInput: Input,
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
      default: () => {},
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
      this.$emit('update-value', $event.target);
    },
    editCategory() {
      if (!this.access.edit) return;
      this.$emit('clear-message');
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('edit-category');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.categories-edit {
  &__back {
    margin-top: 20px;
  }
  &__notice {
    margin-top: 20px;
  }
  &__text {
    margin-top: 20px;
    &__submit {
      margin-top: 20px;
    }
  }
}
</style>
