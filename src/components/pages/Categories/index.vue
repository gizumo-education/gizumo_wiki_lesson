<!-- <template>
  <router-view />
</template> -->

<template>
  <app-category-post />
  <app-category-list />
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
};
</script>
