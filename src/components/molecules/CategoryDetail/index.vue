<template>
  <section>
    <app-heading>カテゴリー管理</app-heading>
    <div>
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
    <div>
      <form action="">
        <div>
          <app-input
            v-validate="'required'"
            name="name"
            type="text"
            placeholder="カテゴリー名"
            :value="category.name"
          />
        </div>
        <div>
          <app-button>
            更新
          </app-button>
        </div>
      </form>
      <div v-if="errorMessage" class="users-detail__notice">
        <app-text bg-error>{{ errorMessage }}</app-text>
      </div>

      <div v-if="doneMessage" class="users-detail__notice">
        <app-text bg-success>{{ doneMessage }}</app-text>
      </div>
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
  },
};
</script>

<style lang="scss" scoped>

</style>
