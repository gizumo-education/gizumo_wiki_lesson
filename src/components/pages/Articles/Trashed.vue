<template>
  <app-article-trashed
    :target-array="articlesList"
    :done-message="doneMessage"
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
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
  },
  created() {
    this.$store.dispatch('articles/getTrashedPage');
  },
};
</script>
