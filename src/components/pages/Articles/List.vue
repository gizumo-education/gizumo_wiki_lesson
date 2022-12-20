<template>
  <div class="articles">
    <app-article-list
      :title="title"
      :target-array="articlesList"
      :target-meta="articlesMeta"
      :done-message="doneMessage"
      :access="access"
      border-gray
      @open-modal="openModal"
      @handle-click="handleClick"
      @pagination-click="paginationClick"
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
      } else if (this.pageNum) {
        this.$store.dispatch('articles/getAllArticles', this.pageNum);
      } else {
        this.$store.dispatch('articles/getAllArticles', this.$route.query.page);
      }
    },
    paginationClick(pageNum) {
      this.pageNum = pageNum;
      this.$router.push({ query: { page: pageNum } });
    },
  },
};
</script>
