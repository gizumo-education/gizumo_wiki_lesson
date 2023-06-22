<template>
  <app-article-trashed
    :target-array="trashedArticleList"
    :error-message="errorMessage"
  />
</template>

<script>
import { ArticleTrashed } from '@Components/molecules';

export default {
  components: {
    appArticleTrashed: ArticleTrashed,
  },
  computed: {
    trashedArticleList() {
      return this.$store.state.articles.trashedArticleList;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('articles/getTrashedPage');
  },
};
</script>
