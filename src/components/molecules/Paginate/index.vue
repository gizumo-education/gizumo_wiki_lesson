<template>
  <div class="paginate">
    <app-button
      :disabled="currentPage === 1"
      class="paginate-padding"
    >
      <app-router-link
        :to="`${path}?page=1`"
        class="paginate__link"
      >
        1
      </app-router-link>
    </app-button>
    <span class="paginate__dots paginate-margin-left">...</span>
    <app-button
      v-for="page in pages"
      :key="page"
      :disabled="currentPage === page"
      class="paginate-padding paginate-margin-left"
    >
      <app-router-link
        :to="`${path}?page=${page}`"
        class="paginate__link"
      >
        {{ page }}
      </app-router-link>
    </app-button>
    <span
      v-if="currentPage <= totalCount - 3"
      class="paginate__dots paginate-margin-left"
    >
      ...
    </span>
    <app-button
      :disabled="currentPage === totalCount"
      class="paginate-padding paginate-margin-left"
    >
      <app-router-link
        :to="`${path}?page=${totalCount}`"
        class="paginate__link"
      >
        {{ totalCount }}
      </app-router-link>
    </app-button>
  </div>
</template>

<script>
import { Button, RouterLink } from '@Components/atoms';

export default {
  components: {
    appButton: Button,
    appRouterLink: RouterLink,
  },
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalCount: {
      type: Number,
      default: 36, // 設計書の数(仮の数字)
    },
    pagePath: {
      type: String,
      default: '',
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
</style>
