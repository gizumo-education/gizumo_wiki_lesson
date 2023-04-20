<template>
  <div class="home">
    <article class="home__content">
      <app-category-post
        class="category-post"
        :access="access"
      />
      <app-category-list
        class="list-items"
        :theads="theads"
        :categories="categoryList"
        :access="access"
      />
    </article>
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,

  },
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    categoryList() {
      return this.$store.getters['categories/categoryList'];
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>

<style lang="scss" scoped>
.home__content {
  display: flex;
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
}
.category-post {
  width: 40%;
}
.list-items {
  width: 60%;
}
</style>
