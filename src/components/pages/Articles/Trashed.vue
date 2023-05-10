<template>
  <app-article-trash
    :theads="theads"
    :trashes="trashedArticles"
    :error-message="errorMessage"
  />
</template>

<script>
import { ArticleTrash } from '@Components/molecules';

export default {
  components: {
    appArticleTrash: ArticleTrash,
  },
  data() {
    return {
      theads: ['タイトル', '本文', '作成日'],
    };
  },
  computed: {
    trashedArticles() {
      return this.$store.state.articles.trashedArticle;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('articles/getTrashedArticle');
  },
};
</script>
