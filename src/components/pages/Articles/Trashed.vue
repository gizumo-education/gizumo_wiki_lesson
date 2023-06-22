<template>
  <app-article-trashed
    :target-array="trashedArticleList"
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
    trashedArticleList() {
      return this.$store.state.articles.trashedArticleList;
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
