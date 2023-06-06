<template>
  <div class="articles">
    <app-article-list
      :title="title"
      :target-array="articlesList"
      :done-message="doneMessage"
      :access="access"
      :current-page="currentPage"
      :total-pages="totalPages"
      :visible-pages="visiblePages"
      border-gray
      @open-modal="openModal"
      @handle-click="handleClick"
      @go-to-page="goToPage"
      @generate-page-numbers="generatePageNumbers"
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
      currentPage: 1, // 現在のページ番号
      totalPages: 10, // 総ページ数 last_pageを使う
      visiblePages: 7, // 表示するページ番号の数（両端を含む）
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
      } else {
        this.$store.dispatch('articles/getAllArticles');
      }
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    },
    generatePageNumbers() {
      // console.log(88)
      const pageNumbers = [];
      let startPage = 1;
      let endPage = this.totalPages;

      if (this.totalPages > this.visiblePages) {
        // console.log(77)
        const maxVisiblePages = this.visiblePages - 2;
        const offset = Math.floor(maxVisiblePages / 2);

        if (this.isFirstPageVisible()) {
          // console.log(66)
          startPage = this.currentPage - offset;
          endPage = this.currentPage + offset;

          if (endPage > this.totalPages) {
            // console.log(65)
            endPage = this.totalPages;
            startPage = endPage - maxVisiblePages + 1;
          }
        } else if (this.isLastPageVisible()) {
          // console.log(55)
          endPage = this.currentPage + offset;
          startPage = endPage - maxVisiblePages + 1;

          if (startPage < 1) {
            // console.log(54)
            startPage = 1;
            endPage = startPage + maxVisiblePages - 1;
          }
        }
      }
      // ページ番号を生成する処理を実装する
      // 以下はサンプルの実装です
      for (let i = startPage; i <= endPage; i += 1) {
        // console.log('for')
        pageNumbers.push(i);
      }
      return pageNumbers;
    },
    isFirstPageVisible() {
      return this.currentPage > Math.floor(this.visiblePages / 2) + 1;
    },
    isLastPageVisible() {
      return this.totalPages - this.currentPage >= Math.floor(this.visiblePages / 2);
    },
  },
};
</script>
