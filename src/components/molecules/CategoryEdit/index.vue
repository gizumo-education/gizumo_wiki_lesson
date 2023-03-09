<template>
  <div>
    <app-heading :level="1">
      カテゴリー管理
    </app-heading>
    <app-router-link
      to="/categories"
      underline
      hover-opacity
      class="category-edit__list-link"
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <app-input
      :value="category"
      required
      @update-value="$emit('update-value', $event)"
    />
    <app-button
      class="category-edit__update-button"
      round
      @click="$emit('click', $event)"
    >
      更新
    </app-button>
    <div v-if="errorMessage" class="category-management-post__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
    <div v-if="doneMessage" class="category-management-post__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </div>
</template>

<script>
import {
  Button, Heading, RouterLink, Input, Text,
} from '@Components/atoms';

export default {
  components: {
    appButton: Button,
    appHeading: Heading,
    appRouterLink: RouterLink,
    appInput: Input,
    appText: Text,
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
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.category-edit__list-link {
  margin-top: 16px;
}
.category-edit__update-button {
  margin-top: 16px;
}
.category-management-post {
  &__notice {
    margin-top: 16px;
  }
}
</style>
