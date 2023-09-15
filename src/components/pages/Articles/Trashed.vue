<template>
  <app-article-trashed
    :theads="theads"
    :target-array="articleList"
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
    articleList() {
      return this.$store.state.articles.articleList;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      this.$store.dispatch('articles/getTrashedArticles');
    },
  },
};
</script>
