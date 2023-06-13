<template>
  <section class="users-detail">
    <app-heading :level="1">カテゴリー管理</app-heading>

    <div class="users-detail__back">
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

    <form class="users-detail__info" @submit.prevent="editCategory">
      <div class="users-detail__info__row">
        <div class="users-detail__info__row__content">
          <app-input
            v-validate="'required'"
            name="categoryName"
            type="text"
            placeholder="名前"
            data-vv-as="名前"
            :error-messages="errors.collect('categoryName')"
            :value="category.name"
            @update-value="updateValue"
          />
        </div>
      </div>

      <div class="users-detail__info__submit">
        <app-button
          button-type="submit"
          :disabled="disabled || !access.edit"
          round
        >
          {{ buttonText }}
        </app-button>
      </div>
    </form>

    <div v-if="errorMessage" class="users-detail__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div v-if="doneMessage" class="users-detail__notice">
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
    options: {
      type: Array,
      default: () => [],
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
.users-detail {
  &__back {
    margin-top: 20px;
  }
  &__notice {
    margin-top: 20px;
  }
  &__info {
    margin: 0 auto;
    margin-top: 20px;
    width: 80%;
    &__row {
      display: flex;
      align-items: center;
      margin-top: 20px;
      &:first-child {
        margin-top: 0;
      }
      &__title {
        width: 20%;
        text-align: right;
      }
      &__content {
        margin-left: 10%;
        width: 70%;
      }
    }
    &__submit {
      text-align: right;
      margin-top: 20px;
    }
  }
}
</style>
