<template>
  <div class="paginate">
    <app-router-link
      :to="`${path}?page=1`"
      :exact-active-class="currentPage === 1 ? 'is-disable' : ''"
      class="paginate__link"
    >
      1
    </app-router-link>
    <span class="paginate__dots paginate-margin-left">...</span>
    <app-router-link
      v-for="page in pages"
      :key="page"
      :to="`${path}?page=${page}`"
      :exact-active-class="page === currentPage ? 'is-disable' : ''"
      class="paginate__link paginate-margin-left"
    >
      {{ page }}
    </app-router-link>
    <span
      v-if="currentPage <= totalCount - 3"
      class="paginate__dots paginate-margin-left"
    >
      ...
    </span>
    <app-router-link
      :to="`${path}?page=${totalCount}`"
      :exact-active-class="currentPage === totalCount ? 'is-disable' : ''"
      class="paginate__link paginate-margin-left"
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
.paginate {
  margin-top: 25px;
  display: flex;
  justify-content: center;

  &__link {
    padding: 8px 20px;
    background-color: $theme-color;
    color: #ffffff;
  }
  &__dots {
    position: relative;
    top: -5px;
    color: #757474;
    font-size: 20px;
    margin-left: 20px;
  }
  &-padding {
    padding: 0;
  }
  &-margin-left {
    margin-left: 20px;
  }
}
.is-disable {
  cursor: auto;
  background-color: $disabled-color;
}
</style>
