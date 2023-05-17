<template>
  <div class="articles">
    <app-article-list
      :title="title"
      :target-array="articlesList"
      :done-message="doneMessage"
      :access="access"
      border-gray
      @open-modal="openModal"
      @handle-click="handleClick"
    />
    <div class="pagination">
      <app-pagination
        :current-page="currentPage"
        :total-pages="lastPage"
        :page-range="pageRange"
      />
    </div>
  </div>
</template>

<script>
import { ArticleList, Pagination } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appArticleList: ArticleList,
    appPagination: Pagination,
  },
  mixins: [Mixins],
  beforeRouteUpdate(to, from, next) {
    if (!this.$route.query.page) {
      this.fetchArticles();
    }
    next();
    this.fetchArticles();
  },
  data() {
    return {
      title: 'すべて',
    };
  },
  computed: {
    articlesList() {
      return this.$store.state.articles.articleList;
    },
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    currentPage() {
      return this.$store.state.articles.currentPage;
    },
    lastPage() {
      return this.$store.state.articles.lastPage;
    },
    pageRange() {
      return this.$store.state.articles.pageRange;
    },
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    openModal(articleId) {
      this.$store.dispatch('articles/confirmDeleteArticle', articleId);
      this.toggleModal();
    },
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
        this.$store.dispatch('articles/getAllArticles');
      }
    },
    fetchArticles() {
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
      } else if (this.$route.query.page) {
        this.$store.dispatch('articles/getPaginatedArticles', this.$route.query.page);
      } else {
        this.$store.dispatch('articles/getPaginatedArticles', 1);
        // this.$store.dispatch('articles/getAllArticles');
      }
    },
  },
};
</script>

<style lang='scss' scoped>
  .articles {
    display: flex;
    flex-direction: column;
  }
  .pagination {
    margin: 30px auto 0;
  }
</style>
