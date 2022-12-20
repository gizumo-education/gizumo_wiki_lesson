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
        v-if="(buttonPage + (n - 1) === targetMeta.current_page)"
        small
        hover-opacity
        class="pagination-item"
        disabled
      >
        {{ buttonPage + (n - 1) }}
      </app-button>
      <app-button
        v-if="(buttonPage + (n - 1) !== targetMeta.current_page)"
        small
        hover-opacity
        class="pagination-item"
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
  data() {
    return {
      buttonPage: 1,
    };
  },
  computed: {
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
