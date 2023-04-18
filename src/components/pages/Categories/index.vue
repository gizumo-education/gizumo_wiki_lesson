<template>
  <div class="categories">
    <div class="categories__post">
      <app-category-post />
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
};
</script>

<style lang="scss" scoped>

</style>
