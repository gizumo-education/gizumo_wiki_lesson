<template>
  <div class="articles">
    <app-article-list
      :title="title"
      :target-array="articlesList"
      :done-message="doneMessage"
      :access="access"
      :current-page="currentPage"
      :total-pages="totalPages"
      :visible-pages="visiblePages"
      border-gray
      @open-modal="openModal"
      @handle-click="handleClick"
      @go-to-page="goToPage"
    />
  </div>
</template>

<script>
import { ArticleList } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appArticleList: ArticleList,
  },
  mixins: [Mixins],
  beforeRouteUpdate(to, from, next) {
    this.fetchArticles();
    next();
  },
  data() {
    return {
      title: 'すべて',
      currentPage: 1,
      totalPages: null,
      visiblePages: 7,
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
      } else {
        this.$store.dispatch('articles/getAllArticles').then(() => {
          this.totalPages = this.$store.state.articles.meta.last_page;
          this.currentPage = parseInt(this.$route.query.page, 10) || 1;
          const pageNumber = this.currentPage;
          this.$store.dispatch('articles/getPage', pageNumber);
        }).catch(() => {
          // console.log(err);
        });
      }
    },
    goToPage(pageNumber) {
      const currentPath = this.$route.path;
      const query = { ...this.$route.query, page: pageNumber };
      this.$router.push({ path: currentPath, query });
    },
  },
};
</script>
