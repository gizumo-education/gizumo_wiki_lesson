<template>
  <app-category-list
    :target-array="articlesList"
    :done-message="doneMessage"
    :access="access"
  />
</template>

<script>
import { CategoryList } from '@Components/molecules';

export default {
  components: {
    appCategoryList: CategoryList,
  },
  computed: {
    articlesList() {
      return this.$store.state.articles.articleList;
    },
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('articles/getAllArticles');
  },
};
</script>
