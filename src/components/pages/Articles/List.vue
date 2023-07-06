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
    <app-pagenation
      :show-pages="showPages"
      :current-page="currentPage"
      :total-pages="totalPages"
      @current-page="getCurrentPage"
    />
  </div>
</template>

<script>
import { ArticleList, Pagenation } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appArticleList: ArticleList,
    appPagenation: Pagenation,
  },
  mixins: [Mixins],
  beforeRouteUpdate(to, from, next) {
    const currentPage = parseInt(to.query.page, 10) || 1;
    this.fetchArticles(currentPage);
    next();
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
    showPages() {
      return this.$store.state.articles.showPages;
    },
    currentPage() {
      return this.$store.state.articles.currentPage;
    },
    totalPages() {
      return this.$store.state.articles.totalPages;
    },
  },
  created() {
    const currentPage = parseInt(this.$route.query.page, 10 || 1);
    this.fetchArticles(currentPage);
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
    fetchArticles(currentPage) {
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
        this.$store.dispatch('articles/getAllArticles', currentPage);
      }
    },
    getCurrentPage(currentPage) {
      this.$store.dispatch('articles/getAllArticles', currentPage);
    },
  },
};
</script>
