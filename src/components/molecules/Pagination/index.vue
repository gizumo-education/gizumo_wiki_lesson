<template>
  <div class="pagination">
    <app-router-link
      :to="`${path}?page=1`"
      :class="{'disable': currentPage === 1}"
      class="pagination__link"
      hover-opacity
      bg-theme-color
    >
      1
    </app-router-link>
    <span>...</span>
    <app-router-link
      v-for="page in pages"
      :key="page"
      :to="`${path}?page=${page}`"
      :class="{'disable': currentPage === page}"
      class="pagination__link"
      hover-opacity
      bg-theme-color
    >
      {{ page }}
    </app-router-link>
    <span
      v-if="currentPage <= totalCount - 3"
    >
      ...
    </span>
    <app-router-link
      :to="`${path}?page=${totalCount}`"
      :class="{'disable': currentPage === totalCount}"
      class="pagination__link"
      hover-opacity
      bg-theme-color
    >
      {{ totalCount }}
    </app-router-link>
  </div>
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
      default: 1,
    },
    totalCount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pages() {
      const start = Math.max(this.currentPage - 2, 2);
      const end = Math.min(this.totalCount - 1, start + 4);
      const pages = [];
      for (let i = start; i <= end; i += 1) {
        pages.push(i);
      }
      return pages;
    },
    path() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  text-align: center;
  padding: 10px;
  &__link {
    color: white;
    padding: 15px;
    margin: 5px;
  }
}
.disable{
    pointer-events: none;
    background-color: $disabled-color;
  }
</style>
