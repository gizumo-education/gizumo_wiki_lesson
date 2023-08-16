<template>
  <ul class="pagination">
    <li>
      <app-button
        :disabled="currentPage === 1"
        @click="getCurrentPage"
      >
        1
      </app-button>
    </li>
    <li class="inactive">...</li>

    <li>
      <app-button
        v-for="page in middlePageRange"
        :key="page"
        :disabled="currentPage === page"
        class="pagination__submit"
        @click="getCurrentPage"
      >
        {{ page }}
      </app-button>
    </li>
    <li class="inactive">...</li>

    <li>
      <app-button
        :disabled="currentPage === lastPage"
        @click="getCurrentPage"
      >
        {{ lastPage }}
      </app-button>
    </li>
  </ul>
</template>
<script>
import { Button } from '@Components/atoms';

export default {
  components: {
    appButton: Button,
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
    middlePageRange() {
      const range = 5;
      let start = '';
      let last = this.lastPage;
      if (this.currentPage <= range - 1) {
        start = 2;
        last = range + 1;
      } else if (this.currentPage > this.lastPage - (range - 2)) {
        start = this.lastPage - range;
        last = this.lastPage - 1;
      } else {
        start = this.currentPage - 2;
        last = this.currentPage + 2;
      }
      return this.calRange(start, last);
    },
  },
  methods: {
    calRange(start, last) {
      const range = [];
      for (let i = start; i <= last; i += 1) {
        range.push(i);
      }
      return range;
    },
    getCurrentPage($event) {
      this.$emit('change-page', $event);
    },
  },
};
</script>

<style lang="scss" scoped>
  .pagination {
    margin-top: 20px;
    margin-left: 300px;
    display: flex;
    list-style-type: none;
    .inactive {
      font-size: 20px;
      padding: 0 10px;
    }
    &__submit {
      margin-left: 20px;
    }
    :first-child {
      margin-left: 0;
    }
  }
</style>
