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
    <app-pagination :current-page="currentPage" :last-page="lastPage" />
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
    this.fetchArticles(to.query.page);
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
    currentPage() {
      return this.$store.state.articles.currentPage;
    },
    lastPage() {
      return this.$store.state.articles.lastPage;
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
    fetchArticles(pageParam) {
      if (this.$route.query.category) {
        const { category } = this.$route.query;
        this.title = category;
        this.$store
          .dispatch('articles/filteredArticles', category).then(() => {
            if (this.$store.state.articles.articleList.length === 0) {
              this.$router.push({ path: '/notfound' });
            }
          }).catch(() => {
            // console.log(err);
          });
      } else {
        if (pageParam === this.currentPage) return; // 現在ページをクリックしたとき処理を中断
        this.$store.dispatch('articles/getAllArticles', pageParam);
      }
    },
  },
};
</script>
