<template>
  <div class="articles">
    <app-article-list
      :title="title"
      :target-array="articlesList"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :access="access"
      border-gray
      @open-modal="openModal"
      @handle-click="handleClick"
    />
    <app-pagination
      :query-page="queryPage"
      :first-page="firstPage"
      :last-page="lastPage"
      @move-article-page="moveArticlePage"
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
    this.fetchArticles();
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
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    firstPage() {
      return this.$store.getters['articles/firstPage'];
    },
    lastPage() {
      return this.$store.getters['articles/lastPage'];
    },
    queryPage() {
      return parseInt(this.$route.query.page, 10);
    },
  },
  created() {
    if (!this.$route.query.page) {
      this.$router.push({ path: 'articles', query: { page: 1 } });
      this.fetchArticles();
      this.$store.dispatch('articles/getAllArticles', this.$route.query.page);
    } else {
      this.fetchArticles();
      this.$store.dispatch('articles/getPageArticles', this.$route.query.page);
    }
  },
  updated() {
    if (!this.$route.query.page) {
      this.$router.push({ path: 'articles', query: { page: 1 } });
      this.$store.dispatch('articles/getAllArticles', this.$route.query.page);
    }
  },
  methods: {
    openModal(articleId) {
      this.$store.dispatch('articles/confirmDeleteArticle', articleId);
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('articles/deleteArticle')
        .then(() => {
          this.$store.dispatch('articles/getAllArticles', this.$route.query.page);
        });
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
      }
    },
    moveArticlePage($event) {
      const clickedPage = $event.target.innerHTML.trim();
      this.$router.push({ path: 'articles', query: { page: clickedPage } })
        .catch(() => {});
      this.$store.dispatch('articles/getPageArticles', this.$route.query.page);
    },
  },
};
</script>
