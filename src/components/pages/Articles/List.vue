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
    <app-pagination
      v-if="totalArticles > perPage"
      :path="path"
      :current-page="currentPage"
      :total-page="totalPage"
    />
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
    const pageId = to.query.page;
    this.fetchArticles(pageId);
    next();
  },
  data() {
    return {
      title: 'すべて',
      path: '/articles',
    };
  },
  computed: {
    articlesList() {
      return this.$store.state.articles.articleList;
    },
    currentPage() {
      return this.$store.state.articles.currentPage;
    },
    totalPage() {
      return this.$store.state.articles.totalPage;
    },
    perPage() {
      return this.$store.state.articles.perPage;
    },
    totalArticles() {
      return this.$store.state.articles.totalArticles;
    },
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    const pageId = this.$route.query.page;
    this.fetchArticles(pageId);
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
    fetchArticles(pageId) {
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
        this.$store.dispatch('articles/getAllArticles', pageId);
      }
    },
  },
};
</script>
