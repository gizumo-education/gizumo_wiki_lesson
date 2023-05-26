<template>
  <div class="category-edit">
    <app-heading
      class="category-edit__head"
    >
      カテゴリー管理
    </app-heading>
    <app-router-link
      class="category-edit__return"
      underline
      hover-opacity
      :to="`/categories`"
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <app-input
      v-validate="'required'"
      class="category-edit__input"
      name="category"
      type="text"
      :value="editCategoryName"
      @update-value="$emit('edit-value', $event)"
    />
    <app-button
      class="category-edit__button"
      button-type="submit"
      round
      @click="editClick(editId, editCategoryName)"
    >
      更新
    </app-button>

    <div v-if="doneMessage" class="category-edit__doneMessage">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
    <div v-if="errorMessage" class="category-edit__errorMessage">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
  </div>
</template>

<script>
import {
  RouterLink, Heading, Button, Input, Text,
} from '@Components/atoms';

export default {
  components: {
    appRouterLink: RouterLink,
    appHeading: Heading,
    appButton: Button,
    appInput: Input,
    appText: Text,
  },
  props: {
    theads: {
      type: Array,
      default() {
        return [];
      },
    },
    editId: {
      type: Number,
      default: null,
    },
    editCategoryName: {
      type: String,
      default: '',
    },
    doneMessage: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    editClick(editId, editCategoryName) {
      this.$emit('edit-click', editId, editCategoryName);
    },
  },
};
</script>

<style lang="scss" scoped>
.category-edit {
  &__return {
    margin-top: 15px;
  }
  &__input,
  &__button,
  &__doneMessage,
  &__errorMessage {
    margin-top: 20px;
  }
}
</style>
