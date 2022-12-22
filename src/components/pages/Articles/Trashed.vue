<template>
  <div class="articles">
    <app-article-trashed
      :title="title"
      :target-array="articlesList"
      :done-message="doneMessage"
      :access="access"
      border-gray
      @handle-click="handleClick"
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
  beforeRouteUpdate(to, from, next) {
    this.fetchArticles();
    next();
  },
  data() {
    return {
      title: '削除済記事',
      pageNum: null,
    };
  },
  computed: {
    articlesList() {
      return this.$store.state.articles.articleList;
    },
    articlesMeta() {
      return this.$store.state.articles.articleMeta;
    },
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.fetchTrashed();
  },
  methods: {
    handleClick() {
      this.$store.dispatch('articles/deleteArticle');
      this.toggleModal();
      if (this.$route.query.category) {
        const { category } = this.$route.query;
        this.title = category;
        this.$store.dispatch('articles/filteredArticles', category)
          .then(() => {
            if (this.$store.state.articles.articleList.length === 0) {
              this.$router.push({ path: '/notfound' });
            }
          }).catch(() => {
            // console.log(err);
          });
      } else {
        this.$store.dispatch('articles/getAllArticles', this.$route.query.page);
      }
    },
    fetchTrashed() {
      this.$store.dispatch('articles/getTrashed');
      console.log(this.$store.state.articles.articleList);
    },
    paginationClick(pageNum) {
      this.pageNum = pageNum;
      this.$router.push({ query: { page: pageNum } });
    },
  },
};
</script>
