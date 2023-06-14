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
    visiblePages: {
      type: Number,
      default: 5,
    },
  },
  methods: {
    goToPage(pageNumber) {
      if (pageNumber === this.currentPage) {
        return;
      }
      this.$emit('go-to-page', pageNumber);
    },
    isFirstPageVisible() {
      return this.currentPage > Math.floor(this.visiblePages / 2) + 1;
    },
    isLastPageVisible() {
      return this.totalPages - this.currentPage >= Math.floor(this.visiblePages / 2);
    },
    generatePageNumbers() {
      const pageNumbers = [];
      let startPage = 2;
      let endPage = this.totalPages - 1;

      if (this.totalPages - 1 > this.visiblePages) {
        const maxVisiblePages = this.visiblePages;
        const offset = Math.floor(maxVisiblePages / 2);

        if (this.isFirstPageVisible()) {
          startPage = this.currentPage - offset;
          endPage = this.currentPage + offset;

          if (endPage > this.totalPages - 1) {
            endPage = this.totalPages - 1;
            startPage = endPage - maxVisiblePages + 1;
          }
        } else if (this.isLastPageVisible()) {
          endPage = this.currentPage + offset;
          startPage = endPage - maxVisiblePages + 1;

          if (startPage < 2) {
            startPage = 2;
            endPage = startPage + maxVisiblePages - 1;
          }
        }
      }
      for (let i = startPage; i <= endPage; i += 1) {
        pageNumbers.push(i);
      }
      return pageNumbers;
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