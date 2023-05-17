<template>
  <ul class="pagination-inner">
    <li
      v-for="pageNumber in pageRange"
      :key="pageNumber.id"
      class="pagination-item"
    >
      <template
        v-if="pageNumber.range === '…'"
      >
        <app-text
          ellipsis
          bold
        >
          {{ pageNumber.range }}
        </app-text>
      </template>
      <template
        v-else-if="pageNumber.range !== currentPage"
      >
        <app-router-link
          :to="`?page=${pageNumber.range}`"
          large
          white
          bg-theme-color
          hover-opacity
        >
          {{ pageNumber.range }}
        </app-router-link>
      </template>
      <template
        v-else
      >
        <app-button
          big
          disabled
        >
          {{ pageNumber.range }}
        </app-button>
      </template>
    </li>
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
    pageRange: {
      type: Array,
      default: () => [],
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
