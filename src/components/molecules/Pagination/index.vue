<template>
  <nav class="pagination">
    <ol class="pagination__list--ordered">
      <template v-if="currentPage > 3">
        <li @click="changePage(1)">
          <app-router-link to="/articles?page=1" white>1</app-router-link>
        </li>
        <span>…</span>
      </template>
      <li v-for="page in paginationList" :key="page" @click="changePage(page)">
        <app-router-link
          v-if="page === currentPage"
          :to="`/articles?page=${page}`"
          white
          class="is-current"
        >
          {{ page }}
        </app-router-link>
        <app-router-link v-else :to="`/articles?page=${page}`" white>
          {{ page }}
        </app-router-link>
      </li>
      <template v-if="currentPage < lastPage - 2">
        <span>…</span>
        <li @click="changePage(lastPage)">
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
      default: null,
    },
    lastPage: {
      type: Number,
      default: null,
    },
  },
  computed: {
    paginationList() {
      let paginationList = [];
      if (this.currentPage <= 2) {
        paginationList = [1, 2, 3, 4, 5];
      } else if (this.currentPage > this.lastPage - 2) {
        for (let i = -4; i <= 0; i += 1) {
          paginationList.push(this.lastPage + i);
        }
      } else {
        for (let i = -2; i <= 2; i += 1) {
          paginationList.push(this.currentPage + i);
        }
      }
      return paginationList;
    },
  },
  methods: {
    changePage(page) {
      this.$emit('change-page', page);
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
