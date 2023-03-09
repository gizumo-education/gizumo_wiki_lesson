<template>
  <div class="articles">
    <app-article-list
      :title="title"
      :target-array="articlesList"
      :page-total="pageTotal"
      :page-num="pageNum"
      :article-total="articleTotal"
      :done-message="doneMessage"
      :access="access"
      border-gray
      @open-modal="openModal"
      @handle-click="handleClick"
    />
    <app-pagination
      :page-total="pageTotal"
      :page-num="pageNum"
      :article-total="articleTotal"
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
    const params = to.query.page;
    this.fetchArticles(params);
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
    pageTotal() {
      return this.$store.state.articles.pageTotal;
    },
    pageNum() {
      return this.$store.state.articles.pageNum;
    },
    articleTotal() {
      return this.$store.state.articles.articleTotal;
    },
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    const params = this.$route.query.page;
    this.fetchArticles(params);
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
        this.$store.dispatch('articles/getArticles');
      }
    },
    fetchArticles(params) {
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
        this.$store.dispatch('articles/getArticles', params);
      }
    },
  },
};
</script>
