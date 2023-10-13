<template>
  <section class="users-create">
    <app-heading :level="1">ユーザー作成</app-heading>
    <div class="users-create__back">
      <app-router-link
        block
        underline
        key-color
        hover-opacity
        to="/users"
      >
        ユーザー一覧へ戻る
      </app-router-link>
    </div>

    <form class="users-create__form" @submit.prevent="createUser">
      <div class="users-create__input">
        <app-input
          v-validate="'required'"
          name="accountName"
          type="text"
          placeholder="アカウント名"
          data-vv-as="アカウント名"
          :error-messages="errors.collect('accountName')"
          :value="accountName"
          @update-value="updateValue"
        />
      </div>
      <div class="users-create__input">
        <app-input
          v-validate="'required|email'"
          name="email"
          type="text"
          placeholder="メールアドレス"
          data-vv-as="メールアドレス"
          :error-messages="errors.collect('email')"
          :value="email"
          @update-value="updateValue"
        />
      </div>
      <div class="users-create__input">
        <app-input
          v-validate="'required'"
          name="password"
          type="password"
          placeholder="パスワード"
          data-vv-as="パスワード"
          :error-messages="errors.collect('password')"
          :value="password"
          @update-value="updateValue"
        />
      </div>

      <div v-if="cautionMessage" class="users-create__notice">
        <app-text ex-small>{{ cautionMessage }}</app-text>
      </div>

      <div class="users-create__button">
        <app-button
          button-type="submit"
          :disabled="disabled || !access.create"
          block
        >
          {{ buttonText }}
        </app-button>
      </div>
    </form>

    <div v-if="errorMessage" class="users-create__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
  </section>
</template>

<script>
import {
  Button,
  Heading,
  Input,
  Text,
  RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appButton: Button,
    appHeading: Heading,
    appInput: Input,
    appText: Text,
    appRouterLink: RouterLink,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    cautionMessage: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    accountName: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
  },
  computed: {
    buttonText() {
      if (!this.access.create) return '作成権限がありません';
      return this.disabled ? '作成中です...' : '作成';
    },
  },
  methods: {
    updateValue($event) {
      this.$emit('update-value', $event.target);
    },
    createUser() {
      if (!this.access.create) return;
      this.$emit('clear-message');
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('create-user');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.users-create {
  &__back {
    margin-top: 20px;
  }
  &__form {
    margin-top: 20px;
  }
  &__input {
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
  }
  &__notice {
    margin-top: 20px;
  }
  &__button {
    margin-top: 20px;
  }
}
</style>
