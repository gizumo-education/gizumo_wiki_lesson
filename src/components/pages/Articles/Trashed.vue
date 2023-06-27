<template>
  <app-article-trashed
    :theads="theads"
    :target-array="articleList"
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
      title: '削除済み記事',
      theads: ['タイトル', '本文', '作成日'],
    };
  },
  computed: {
    articleList() {
      return this.$store.state.articles.articleList;
    },
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      this.$store.dispatch('articles/getTrashedArticles');
    },
  },
};
</script>
