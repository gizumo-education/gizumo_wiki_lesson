<template>
  <div
    class="pagination"
  >
    <app-button
      small
      hover-opacity
      :disabled="1 === targetMeta.current_page"
      @click="paginationClick(1)"
    >
      1
    </app-button>
    <span
      class="pagination-item-dots"
    >
      …
    </span>
    <div
      v-for="n in 5"
      v-show="(buttonPage + n <= targetMeta.last_page)"
      :key="n"
      class="pagination-item"
    >
      <app-button
        small
        hover-opacity
        :disabled="buttonPage + n - 1 === targetMeta.current_page"
        @click="paginationClick(buttonPage + (n - 1))"
      >
        {{ buttonPage + (n - 1) }}
      </app-button>
    </div>
    <span
      class="pagination-item-dots"
    >
      …
    </span>
    <app-button
      small
      hover-opacity
      class="pagination-item"
      :disabled="targetMeta.last_page === targetMeta.current_page"
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
  data() {
    return {
      buttonPage: 2,
    };
  },
  methods: {
    paginationClick(pageNum) {
      this.$emit('pagination-click', pageNum);
      if (pageNum <= 4) {
        this.buttonPage = 2;
      } else if (pageNum >= this.targetMeta.last_page - 3) {
        this.buttonPage = this.targetMeta.last_page - 5;
      } else {
        this.buttonPage = pageNum - 2;
      }
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
