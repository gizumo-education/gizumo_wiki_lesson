<template>
  <app-article-trashed
    :article-trashed-list="articleTrashedList"
    :theads="theads"
    :error-message="errorMessage"
  />
</template>

<script>
import { ArticleTrashed } from '@Components/molecules';

export default {
  components: {
    appArticleTrashed: ArticleTrashed,
  },
  data() {
    return {
      theads: ['タイトル', '本文', '作成日'],
    };
  },
  computed: {
    articleTrashedList() {
      return this.$store.state.articles.articleTrashedList;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('articles/getArticleTrashedList');
  },
};
</script>

<style lang="scss" scoped>
</style>
