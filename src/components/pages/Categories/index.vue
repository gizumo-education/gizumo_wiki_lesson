<template>
  <div class="categories">
    <div class="categories__post">
      <app-category-post
        :category="targetCategory"
        :error-message="errorMessage"
        :done-message="doneMessage"
        :disabled="disabled"
        :access="access"
      />
    </div>
    <div class="categories__content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { CategoryPost } from '@Components/molecules';

export default {
  components: {
    AppCategoryPost: CategoryPost,
  },
  computed: {
    targetCategory() {
      return this.$store.state.categories.targetCategory;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
};
</script>

<style lang="scss" scoped>
  .categories {
    display: flex;

    &__post {
      width: 30%;
      margin-right: 25px;
    }

    &__content {
      width: 70%;
      padding-left: 25px;
      border-left: 1px solid #cdcdcd;
      overflow: hidden;
    }
  }
</style>
