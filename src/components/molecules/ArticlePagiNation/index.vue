<template>
  <ul class="pagination">
    <li>
      <app-button>
        {{ firstPageRange }}
      </app-button>
    </li>
    <li class="inactive">...</li>
    <li>
      <app-button
        v-for="page in middlePageRange"
        :key="page"
      >
        {{ page }}
      </app-button>
    </li>
    <li class="inactive">...</li>
    <li>
      <app-button>
        {{ lastPageRange }}
      </app-button>
    </li>
  </ul>
</template>
<script>
import { Button } from '@Components/atoms';
// import axios from '@Helpers/axiosDefault';

export default {
  components: {
    appButton: Button,
  },
  data() {
    return {
      articles: [],
      current_page: 1,
      last_page: 10, // 後で''に変更して再度式確認
      range: 5,
    };
  },
  computed: {
    firstPageRange() {
      return this.current_page;
    },
    middlePageRange() {
      let start = '';
      let last = '';
      if (this.current_page <= this.range) {
        start = 2;
        last = this.range + 1;
      } else if (this.current_page > this.last_page - this.range) {
        start = this.last_page - this.range - 1;
        last = this.last_page - 1;
      } else {
        start = this.current_page - Math.floor(this.range / 2);
        last = this.current_page - Math.floor(this.range / 2);
      }
      return this.calRange(start, last);
    },
    lastPageRange() {
      // return this.calRange(this.last_page - 1, this.last_page);
      return this.last_page;
    },
  },
  methods: {
    // async getArticlesPagination() {
    //  const articles = await axios.get(`/articles?page=${this.pageId}`);
    //  this.current_page = articles.data;
    //  this.last_page = articles.last_page;
    //  this.articles = articles.data;
    // },
    calRange(start, last) {
      const range = [];
      for (let i = start; i <= last; i += 1) {
        range.push(i);
      }
      return range;
    },
  },
};
</script>

<style lang="scss" scoped>
  .pagination {
    margin-top: 20px;
    margin-left: 300px;
    display: flex;
    list-style-type: none;
    .li {
      border: 1px solid #ddd;
      padding: 6px 12px;
      text-align: center;
    }
    .inactive {
      padding: 10px;
    }
  }
</style>
