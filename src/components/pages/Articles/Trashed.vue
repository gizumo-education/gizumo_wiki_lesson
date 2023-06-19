<template>
  <div>
    <app-article-trashed
      :theads="theads"
      :trashed-articles="trashedArticleList"
    />
  </div>
</template>

<script>
import { ArticleTrashed } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appArticleTrashed: ArticleTrashed,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['タイトル', '本文', '作成日'],
    };
  },
  computed: {
    trashedArticleList() {
      return this.$store.state.articles.trashedList;
    },
  },
  created() {
    this.$store.dispatch('articles/getAllTrashedArticles');
  },
};
</script>
