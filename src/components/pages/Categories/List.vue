<template>
  <div>
    <app-category-list />
    <app-category-post />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
};
</script>

<style lang="scss" scoped></style>
