<template>
  <ol class="pagination">
    <li class="pagination-btn">
      <app-router-link
        :to="'/articles'"
        white
        class="pagination-btn_link"
      >
        1
      </app-router-link>
    </li>
    <li
      v-if="currentPage > 4"
      class="pagination-btn pagination-dots"
    >
      • • •
    </li>
    <li
      v-for="page in pages"
      :key="page"
      class="pagination-btn"
    >
      <app-router-link
        :to="`/articles?page=${page}`"
        white
        class="pagination-btn_link"
      >
        {{ page }}
      </app-router-link>
    </li>
    <li
      v-if="currentPage < totalPage - 3"
      class="pagination-btn pagination-dots"
    >
      • • •
    </li>
    <li class="pagination-btn">
      <app-router-link
        :to="`/articles?page=${totalPage}`"
        white
        class="pagination-btn_link"
      >
        {{ totalPage }}
      </app-router-link>
    </li>
  </ol>
</template>

<script>
import { RouterLink } from '@Components/atoms';

export default {
  components: {
    appRouterLink: RouterLink,
  },
  props: {
    currentPage: {
      type: Number,
      default: null,
    },
    totalPage: {
      type: Number,
      default: null,
    },
  },
  computed: {
    pages() {
      const range = 5;
      let start = '';
      let end = '';
      if (this.currentPage <= range) {
        start = 2;
        end = range + 1;
      } else if (this.currentPage > this.totalPage - range + 1) {
        start = this.totalPage - range;
        end = this.totalPage - 1;
      } else {
        start = this.currentPage - Math.floor(range / 2);
        end = this.currentPage + Math.floor(range / 2);
      }
      const currentRange = [];
      for (let i = start; i <= end; i += 1) {
        currentRange.push(i);
      }
      return currentRange;
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  text-align: center;
  margin-top: 30px;
  &-btn {
    width: 56px;
    height: 40px;
    margin-left: 20px;
    font-size: 16px;
    line-height: 40px;
    background-color: $theme-color;
    &:first-child {
      margin-left: 0;
    }
    &_link {
      width: 100%;
      height: 100%;
    }
  }
  &-dots {
    color: $disabled-color;
    background-color: $white;
  }
}
</style>
