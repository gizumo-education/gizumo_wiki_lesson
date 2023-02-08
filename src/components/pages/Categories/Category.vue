<template>
  <div class="category">
    <app-category-post
      class="category-form"
      :access="access"
    />
    <app-category-list
      class="category-list"
      :categories="categories"
    />
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categoriesList;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllLists');
  },
};
</script>

<style lang="scss" scoped>
.category {
  display:flex;
}
.category-form {
  flex-basis:30%;
}
.category-list {
  flex-basis:70%;
}
</style>
