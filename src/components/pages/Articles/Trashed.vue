<template>
  <div class="articles">
    <app-article-trashed
      :title="title"
      :target-array="articlesList"
    />
  </div>
</template>

<script>
import { ArticleTrashed } from '@Components/molecules';

export default {
  components: {
    appArticleTrashed: ArticleTrashed,
  },
  data() {
    return {
      title: '削除済記事',
    };
  },
  computed: {
    articlesList() {
      return this.$store.state.articles.articleList;
    },
  },
  created() {
    this.fetchTrashed();
  },
  methods: {
    fetchTrashed() {
      this.$store.dispatch('articles/getTrashed');
    },
  },
};
</script>
