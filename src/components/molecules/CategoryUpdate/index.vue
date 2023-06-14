<template>
  <section class="category-update">
    <app-heading :level="1">カテゴリー管理</app-heading>

    <div class="category-update__back">
      <app-router-link
        underline
        key-color
        hover-opacity
        to="/categories"
      >
        カテゴリー一覧へ戻る
      </app-router-link>
    </div>

    <form class="category-update__info" @submit.prevent="updateCategory">
      <app-input
        v-validate="'required'"
        class="category-update-info__input"
        name="category"
        type="text"
        placeholder="更新するカテゴリー名を入力してください"
        data-vv-as="カテゴリー名"
        :error-messages="errors.collect('category')"
        :value="category.name"
        @update-value="$emit('update-value', $event.target)"
      />
      <app-button
        class="category-update-info__submit"
        button-type="submit"
        round
        :disabled="disabled || !access.create"
      >
        {{ buttonText }}
      </app-button>

      <div v-if="errorMessage" class="category-update-info__notice">
        <app-text bg-error>{{ errorMessage }}</app-text>
      </div>

      <div v-if="doneMessage" class="category-update-info__notice">
        <app-text bg-success>{{ doneMessage }}</app-text>
      </div>
    </form>
  </section>
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
      if (!this.access.create) return '更新権限がありません';
      return this.disabled ? '更新中...' : '更新';
    },
  },
  methods: {
    updateCategory() {
      if (!this.access.create) return;
      this.$emit('clear-message');
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('update-category');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.category-update {
  &__back {
    display: inline-block;
    margin-top: 20px;
  }
  &-info {
    &__input {
      margin-top: 20px;
    }
    &__submit {
      margin-top: 20px;
    }
    &__notice {
      margin-top: 20px;
    }
  }
}
</style>
