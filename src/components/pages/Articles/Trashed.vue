<template>
  <app-article-trashed
    :target-array="articlesList"
  />
</template>

<script>
import { ArticleTrashed } from '@Components/molecules';

export default {
  components: {
    appArticleTrashed: ArticleTrashed,
  },
  computed: {
    articlesList() {
      return this.$store.state.articles.articleList;
    },
  },
  created() {
    this.$store.dispatch('articles/getTrashedPage');
  },
};
</script>
