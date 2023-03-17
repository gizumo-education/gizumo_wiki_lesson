<template>
  <app-article-trashed
    :theads="['タイトル', '本文', '作成日']"
    :target-array="articlesList"
    :error-message="errorMessage"
  />
</template>

<script>
import { ArticleTrashed } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appArticleTrashed: ArticleTrashed,
  },
  mixins: [Mixins],
  computed: {
    articlesList() {
      return this.$store.state.articles.deletedArticleList;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('articles/getTrashedArticles');
  },
};
</script>
