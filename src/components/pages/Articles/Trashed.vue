<template>
  <app-trashed-list
    :path="path"
    :title="title"
    :theads="theads"
    :target-array="trashedArticle"
    :error-message="errorMessage"
    border-gray
  />
</template>

<script>
import { TrashedList } from '@Components/molecules';

export default {
  components: {
    appTrashedList: TrashedList,
  },
  data() {
    return {
      path: '/articles',
      title: '記事',
      theads: ['タイトル', '本文', '作成日'],
    };
  },
  computed: {
    trashedArticle() {
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
