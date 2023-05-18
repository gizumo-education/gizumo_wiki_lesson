<template>
  <ul class="pagination-inner">
    <template
      v-if="disabledLinkToFirst"
    >
      <li>
        <app-router-link
          :to="'?page=1'"
          large
          white
          bg-theme-color
          hover-opacity
        >
          1
        </app-router-link>
      </li>
      <li
        class="pagination-item"
      >
        <app-text
          ellipsis
          bold
        >
          …
        </app-text>
      </li>
    </template>
    <li
      v-for="page in pageRange"
      :key="page"
      class="pagination-item"
    >
      <template
        v-if="page === currentPage"
      >
        <app-button
          big
          disabled
        >
          {{ page }}
        </app-button>
      </template>
      <template
        v-else
      >
        <app-router-link
          :to="`?page=${page}`"
          large
          white
          bg-theme-color
          hover-opacity
        >
          {{ page }}
        </app-router-link>
      </template>
    </li>
    <template
      v-if="disabledLinkToLast"
    >
      <li
        class="pagination-item"
      >
        <app-text
          ellipsis
          bold
        >
          …
        </app-text>
      </li>
      <li
        class="pagination-item"
      >
        <app-router-link
          :to="`?page=${totalPages}`"
          large
          white
          bg-theme-color
          hover-opacity
        >
          {{ totalPages }}
        </app-router-link>
      </li>
    </template>
  </ul>
</template>

<script>
import { Text, RouterLink, Button } from '@Components/atoms';

export default {
  components: {
    appText: Text,
    appRouterLink: RouterLink,
    appButton: Button,
  },
  props: {
    currentPage: {
      type: Number,
      default: null,
    },
    totalPages: {
      type: Number,
      default: null,
    },
  },
  computed: {
    disabledLinkToFirst() {
      return this.currentPage > 3;
    },
    disabledLinkToLast() {
      return this.currentPage < this.totalPages - 2;
    },
    pageRange() {
      let startPage = null;
      const { currentPage, totalPages } = this;
      const calculatedPageRange = [];
      if (currentPage < 3) {
        startPage = 1;
      } else if ((totalPages - 2) < currentPage) {
        startPage = totalPages - 4;
      } else {
        startPage = currentPage - 2;
      }
      for (let i = startPage; i < startPage + 5; i += 1) {
        calculatedPageRange.push(i);
      }
      return calculatedPageRange;
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {

  &-inner {
    margin: 0 auto;
    display: flex;
  }

  &-item {
    margin-left: 20px;
  }
}
</style>
