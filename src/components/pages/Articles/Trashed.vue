<template>
  <section>
    <appArticleTrashList />
    <appArticleTrashTable
      :target-array="articleTrashed"
      :theads="theads"
    />
  </section>
</template>

<script>
import { ArticleTrashList, ArticleTrashTable } from '@Components/molecules';

export default {
  components: {
    appArticleTrashList: ArticleTrashList,
    appArticleTrashTable: ArticleTrashTable,
  },
  data() {
    return {
      theads: ['タイトル', '本文', '作成日'],
    };
  },
  computed: {
    articleTrashed() {
      return this.$store.state.articles.trashedArticleList;
    },
  },
  created() {
    return this.$store.dispatch('articles/getTrashArticles');
  },
};

</script>
