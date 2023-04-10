<template>
  <div class="home">
    <article class="home__content">
      <app-home-article :article-list="articleList" />
    </article>
  </div>
</template>

<script>
import { HomeArticle } from '@Components/molecules';

export default {
  components: {
    appHomeArticle: HomeArticle,
  },
  computed: {
    articleList() {
      return this.$store.getters['articles/tenNewArticleList'];
    },
  },
  created() {
    this.$store.dispatch('articles/getAllArticles');
  },
};
</script>

<style lang="scss" scoped>
.home__content {
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
}
</style>
