<template>
  <div class="articles">
    <app-article-list-trashed
      :target-array="trashedArticlesList"
      :error-message="errorMessage"
      border-gray
    />
  </div>
</template>

<script>
import { ArticleListTrashed } from '@Components/molecules';

export default {
  components: {
    appArticleListTrashed: ArticleListTrashed,
  },
  computed: {
    trashedArticlesList() {
      return this.$store.state.articles.trashedArticleList;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
  },
  created() {
    this.getTrashedArticles();
  },
  methods: {
    getTrashedArticles() {
      this.$store.dispatch('articles/getTrashedArticles');
    },
  },
};
</script>
