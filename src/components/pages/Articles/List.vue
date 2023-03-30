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
      :pagination-last-page="paginationLastPage"
      :pagination-first-page="paginationFirstPage"
      :query-page="queryPage"
      @current-page="getCurrentPage"
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
    // this.fetchArticles();
    next();
  },
  data() {
    return {
      title: 'すべて',
      errmessage: '',
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
    paginationLastPage() {
      return this.$store.getters['articles/lastPage'];
    },
    paginationFirstPage() {
      return this.$store.getters['articles/firstPage'];
    },
    queryPage() {
      return parseInt(this.$route.query.page, 10);
    },
  },
  created() {
    this.fetchArticles(this.$route.query.page);
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
    fetchArticles(queryPage) {
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
        this.$store.dispatch('articles/getAllArticles', queryPage);
      } else if (!this.$route.query.page) {
        this.$router.push({ path: 'articles', query: { page: 1 } });
        this.$store.dispatch('articles/getAllArticles', queryPage);
      }
    },
    getCurrentPage($event) {
      const pageId = Number($event.target.innerHTML);
      if (pageId !== this.queryPage) {
        this.$router.push({ path: 'articles', query: { page: pageId } })
          .catch(() => {});
        this.$store.dispatch('articles/getPaginationArticles', pageId);
      }
    },
  },
};
</script>
