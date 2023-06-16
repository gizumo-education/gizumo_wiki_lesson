<template>
  <div class="pagination">
    <app-button
      class="pagination__button"
      :disabled="currentPage === 1"
      @click="goToPage(1)"
    >
      1
    </app-button>
    <span class="pagination__span">...</span>
    <app-button
      v-for="page in generatePageNumbers()"
      :key="page"
      class="pagination__button"
      :disabled="currentPage === page"
      @click="goToPage(page)"
    >
      {{ page }}
    </app-button>
    <span
      v-if="totalPages > 1"
      class="pagination__span"
    >...</span>
    <app-button
      v-if="totalPages > 1"
      class="pagination__button"
      :disabled="currentPage === totalPages"
      @click="goToPage(totalPages)"
    >
      {{ totalPages }}
    </app-button>
  </div>
</template>

<script>
import { Button } from '@Components/atoms';

export default {
  components: {
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
  data() {
    return {
      visiblePages: 5,
    };
  },
  methods: {
    goToPage(pageNumber) {
      if (pageNumber === this.currentPage) {
        return;
      }
      this.$emit('go-to-page', pageNumber);
    },
    generatePageNumbers() {
      const pageNumbers = [];
      const visiblePages = Math.min(this.visiblePages, this.totalPages - 1);
      const middlePage = Math.floor(visiblePages / 2);
      let startPage = Math.max(2, this.currentPage - middlePage);

      if (startPage + visiblePages > this.totalPages - 1) {
        startPage = Math.max(2, this.totalPages - visiblePages);
      }

      for (let i = startPage; i <= startPage + visiblePages; i += 1) {
        pageNumbers.push(i);
      }

      return pageNumbers.slice(0, visiblePages);
    },
  },
};
</script>

<style lang="scss" scoped>
  .pagination {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    &__button {
      margin: 0 10px 0;
    }
    &__span {
      margin: 0 15px;
      font-size: 22px;
      opacity: 0.5;
    }
  }
</style>
