<template>
  <nav class="pagination">
    <ol class="pagination__list--ordered">
      <template v-if="currentPage > 3">
        <li>
          <app-router-link to="/articles?page=1" white>1</app-router-link>
        </li>
        <span>…</span>
      </template>
      <li v-for="page in paginationRange" :key="page">
        <app-router-link
          :to="`/articles?page=${page}`"
          :class="page === currentPage ? 'is-current' : ''"
          white
        >
          {{ page }}
        </app-router-link>
      </li>
      <template v-if="currentPage < lastPage - 2">
        <span>…</span>
        <li>
          <app-router-link :to="`/articles?page=${lastPage}`" white>
            {{ lastPage }}
          </app-router-link>
        </li>
      </template>
    </ol>
  </nav>
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
      required: true,
    },
    lastPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    paginationRange() {
      const startPage = Math.max(1, this.currentPage - 2);
      const endPage = Math.min(startPage + 4, this.lastPage);
      if (this.currentPage >= this.lastPage - 1) {
        return Array.from({ length: 5 }, (_, i) => endPage - 4 + i);
      }
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 2rem;

  &__list--ordered {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    list-style-type: none;
  }

  &__list--ordered > li > a {
    background-color: $theme-color;
    padding: 1rem 2rem;
    transition: 0.3s;
  }

  &__list--ordered > li > a:hover {
    opacity: 0.8;
  }
}
.is-current {
  background-color: $disabled-color !important;
  pointer-events: none;

  &:hover {
    opacity: initial;
  }
}
</style>
