<template>
  <div
    class="pagination"
  >
    <app-button
      v-if="(targetMeta.current_page === 1)"
      small
      hover-opacity
      disabled
    >
      1
    </app-button>
    <app-button
      v-else
      small
      hover-opacity
      @click="paginationClick(1)"
    >
      1
    </app-button>
    <span
      class="pagination-item-dots"
    >
      …
    </span>
    <div v-for="n in 5" :key="(n)">
      <app-button
        v-if="(targetMeta.display_page + (n - 1) === targetMeta.current_page)"
        small
        hover-opacity
        class="pagination-item"
        disabled
      >
        {{ targetMeta.display_page + (n - 1) }}
      </app-button>
      <app-button
        v-if="(targetMeta.display_page + (n - 1) !== targetMeta.current_page)"
        small
        hover-opacity
        class="pagination-item"
        @click="paginationClick(targetMeta.display_page + (n - 1))"
      >
        {{ targetMeta.display_page + (n - 1) }}
      </app-button>
    </div>
    <span
      class="pagination-item-dots"
    >
      …
    </span>
    <app-button
      v-if="targetMeta.current_page === targetMeta.last_page"
      small
      hover-opacity
      disabled
      class="pagination-item"
    >
      {{ targetMeta.last_page }}
    </app-button>
    <app-button
      v-else
      small
      hover-opacity
      class="pagination-item"
      @click="paginationClick(targetMeta.last_page)"
    >
      {{ targetMeta.last_page }}
    </app-button>
  </div>
</template>

<script>
import {
  Button,
} from '@Components/atoms';

export default {
  components: {
    appButton: Button,
  },
  props: {
    targetMeta: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
  },
  methods: {
    paginationClick(pageNum) {
      this.$emit('pagination-click', pageNum);
    },
  },
};
</script>

<style lang="scss" scoped>
  .pagination {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    &-item {
      margin-left: 16px;
      &-dots {
        @extend .pagination-item;
        color: gray;
      }
    }
  }
</style>
