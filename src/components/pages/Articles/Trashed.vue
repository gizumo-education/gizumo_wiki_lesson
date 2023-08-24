<template>
  <section>
    <appArticleTrashedList />
    <appArticleTrashedTable
      :target-array="articleTrashed"
      :theads="theads"
    />
  </section>
</template>

<script>
import { ArticleTrashedList, ArticleTrashedTable } from '@Components/molecules';

export default {
  components: {
    appArticleTrashedList: ArticleTrashedList,
    appArticleTrashedTable: ArticleTrashedTable,
  },
  data() {
    return {
      theads: ['タイトル', '本文', '作成日'],
    };
  },
  computed: {
    articleTrashed() {
      return this.$store.state.articles.articleList;
    },
  },
  created() {
    this.$store.dispatch('articles/getArticleTrashed');
  },
};
</script>
