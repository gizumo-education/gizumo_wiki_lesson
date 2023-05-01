<template>
  <app-trashed-list
    :theads="theads"
    :title="title"
    :target-array="trashedArticle"
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
      title: '記事',
      theads: ['タイトル', '本文', '作成日'],
    };
  },
  computed: {
    trashedArticle() {
      return this.$store.state.articles.trashedArticle;
    },
  },
  created() {
    this.$store.dispatch('articles/getTrashedArticle');
  },
};
</script>
