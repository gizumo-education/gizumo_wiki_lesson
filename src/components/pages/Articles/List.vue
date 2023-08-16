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
    <app-article-pagination
      :last-page="lastPage"
      :current-page="currentPage"
      @change-page="getCurrentPage"
    />
  </div>
</template>

<script>
import { ArticleList, PagiNation } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appArticleList: ArticleList,
    appArticlePagination: PagiNation,
  },
  mixins: [Mixins],
  beforeRouteUpdate(to, from, next) {
    const { page } = to.query.page;
    next();
    this.fetchArticles(page);
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
    currentPage() {
      return this.$store.state.articles.currentPage;
    },
  },
  created() {
    this.fetchArticles();
    if (!this.$route.query.page) {
      this.$router.push({ path: 'articles', query: { page: 1 } });
    }
  },
  methods: {
    openModal(articleId) {
      this.$store.dispatch('articles/confirmDeleteArticle', articleId);
      this.toggleModal();
    },
    getCurrentPage($event) {
      const pageId = Number($event.target.innerHTML);
      this.$router.push({ path: 'articles', query: { page: pageId } });
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
