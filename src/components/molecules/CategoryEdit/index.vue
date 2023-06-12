<template>
  <section class="category-update">
    <app-heading :level="1">カテゴリー管理</app-heading>

    <div class="category-update__back">
      <app-router-link
        block
        underline
        key-color
        hover-opacity
        to="/categories"
      >
        カテゴリー一覧へ戻る
      </app-router-link>

      <div class="category-update__form">
        <app-input
          v-validate="'required'"
          name="name"
          type="text"
          white-bg
          :error-messages="errors.collect('name')"
          :value="category.name"
          @update-value="$emit('update-value',$event.target)"
        />
      </div>
    </div>
    <div class="category-update__button">
      <app-button
        class="category-update-submit"
        button-type="submit"
        round
        :disabled="disabled || !access.edit"
        @click="handleSubmit"
      >
        {{ buttonText }}
      </app-button>
    </div>

    <div v-if="errorMessage" class="category-update__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div v-if="doneMessage" class="category-update__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </section>
</template>

<script>
import {
  Heading, Button, Text, Input, RouterLink,
} from '@Components/atoms';

export default ({
  components: {
    appHeading: Heading,
    appButton: Button,
    appText: Text,
    appInput: Input,
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
      if (!this.access.edit) return '変更権限がありません';
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
});
</script>

<style lang="scss" scoped>
.category-update {
  &__back {
    margin-top: 16px;
  }
  &__form {
    margin-top: 16px;
  }
  &__button {
    margin-top: 16px;
  }
  &__notice {
    margin-top: 16px;
  }
}
</style>
