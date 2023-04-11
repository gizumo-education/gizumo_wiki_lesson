<template>
  <div class="articles">
    <app-article-list-trashed
      :title="'削除済み記事'"
      :target-array="trashedArticlesList"
      :error-message="errorMessage"
      border-gray
    />
  </div>
</template>

<script>
import { ArticleListTrashed } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appArticleListTrashed: ArticleListTrashed,
  },
  mixins: [Mixins],
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
