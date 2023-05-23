<template>
  <app-article-trashed
    :theads="theads"
    :trashed-articles="trashedArticles"
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
    trashedArticles() {
      return this.$store.state.articles.trashedArticleList;
    },
  },
  created() {
    this.$store.dispatch('articles/getTrashedArticles');
  },
};
</script>

