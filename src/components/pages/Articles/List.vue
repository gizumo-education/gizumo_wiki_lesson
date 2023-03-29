<template>
  <div class="articles">
    <app-article-list
      :title="title"
      :target-array="articlesList"
      :done-message="doneMessage"
      :access="access"
      :page-total="pageTotal"
      :page-current="pageCurrent"
      border-gray
      @open-modal="openModal"
      @handle-click="handleClick"
    />
    <app-pagenation
      :page-total="pageTotal"
      :page-current="pageCurrent"
      @click-pagenation="clickPagenation"
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
    this.fetchArticles();
    next();
  },
  data() {
    return {
      title: 'すべて',
      pageId: null,
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
    pageTotal() {
      return this.$store.state.articles.pageTotal;
    },
    pageCurrent() {
      return this.$store.state.articles.pageCurrent;
    },
  },
  created() {
    // console.log(this.$route)
    this.fetchArticles();
    this.$store.dispatch('articles/getAllArticles', this.$route.query.page);
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
        this.$store.dispatch('articles/getAllArticles');
      }
    },
    clickPagenation($event) {
      // console.log($event.target)
      const pageId = $event.target.innerHTML;
      this.$router.push({ query: { page: pageId } });
      this.$store.dispatch('articles/getAllArticles', pageId);
    },
  },
};
</script>
