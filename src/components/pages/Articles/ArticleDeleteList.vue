<template>
  <app-article-delete-list
    :delete-list="deleteList"
    :theads="theads"
  />
</template>
<script>
import { ArticleDeleteList } from '@Components/molecules';

export default {
  components: {
    appArticleDeleteList: ArticleDeleteList,
  },
  data() {
    return {
      theads: ['タイトル', '本文', '作成日'],
    };
  },
  computed: {
    deleteList() {
      return this.$store.state.articles.targetDeleteArticle;
    },
  },
  created() {
    this.$store.dispatch('articles/getDeleteList');
  },
};
</script>
