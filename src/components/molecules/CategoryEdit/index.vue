<template>
  <div>
    <div v-if="doneMessage" class="category-edit__notice--update">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
    <app-heading :level="1">カテゴリーの更新</app-heading>
    <div>
      <app-router-link
        :to="/categories/"
        theme-color
        underline
        hover-opacity
      >
        カテゴリー一覧へ戻る
      </app-router-link>
    </div>
    <div>
      <app-input
        v-validate="'required'"
        name="title"
        type="text"
        :value="categoryTitle"
        @update-value="$emit('edited-title', $event)"
      />
    </div>
    <app-button
      button-type="submit"
      round
      :disabled="!disabled"
      @click="handleSubmit"
    >
      更新
    </app-button>
  </div>
</template>

<script>
import {
  Heading, Input, Button, Text, RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appRouterLink: RouterLink,
    appButton: Button,
    appText: Text,
  },
  props: {
    categoryTitle: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
