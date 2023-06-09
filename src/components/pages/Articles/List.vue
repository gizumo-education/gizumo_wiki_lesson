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
    <div class="page-nation">
      <app-page-nation
        :last-page="lastPage"
        :page-num="pageNum"
      />
    </div>
  </div>
</template>

<script>
import { ArticleList, PageNation } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appArticleList: ArticleList,
    appPageNation: PageNation,
  },
  mixins: [Mixins],
  beforeRouteUpdate(to, from, next) {
    const { page } = to.query.page;
    this.fetchArticles(page);
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
    lastPage() {
      return this.$store.state.articles.lastPage;
    },
    pageNum() {
      return this.$store.state.articles.pageNum;
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
        this.$store.dispatch('articles/getCurrentPage', this.$route.query.page);
      } else {
        this.$store.dispatch('articles/getAllArticles');
      }
    },
  },
};
</script>
