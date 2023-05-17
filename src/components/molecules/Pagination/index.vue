<template>
  <ul class="pagination__inner">
    <li
      v-for="pageNumber in totalPages"
      :key="pageNumber"
    >
      <template
        v-if="pageNumber !== currentPage"
      >
        <app-router-link
          :to="`?page=${pageNumber}`"
          large
          white
          bgThemeColor
          hoverOpacity
        >
          {{ pageNumber }}
        </app-router-link>
      </template>
      <template
        v-else
      >
        <app-button
          disabled
        >
          {{ pageNumber }}
        </app-button>
      </template>
    </li>
  </ul>
</template>

<script>
import { RouterLink, Button } from '@Components/atoms';

export default {
  components: {
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
};
</script>

<style lang="scss" scoped>
.pagination {

  &__inner {
    width: 100%;
    display: flex;
  }
}
</style>
