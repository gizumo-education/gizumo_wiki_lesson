<template>
  <div class="articles">
    <app-category-post
      class="form"
      :access="access"
    />
    <app-category-list
      class="list"
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
      return this.$store.state.categories.CategoriesList;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllLists');
    // console.log('a');
  },
};
</script>

<style lang="scss" scoped>
.articles {
  display:flex;
}
.form {
  flex-basis:30%;
}
.list {
  flex-basis:70%;
}
</style>
