<template>
  <app-article-delete-list
    :delete-list="deleteList"
    :theads="['タイトル', '本文', '作成日']"
  />
</template>
<script>
import { ArticleDeleteList } from '@Components/molecules';

export default {
  components: {
    appArticleDeleteList: ArticleDeleteList,
  },
  computed: {
    deleteList() {
      return this.$store.state.articles.targetDeleteArticle;
    },
  },
  created() {
    this.$store.dispatch('articles/getDeletedList');
  },
};
</script>
