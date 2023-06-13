<template>
  <div class="pagination">
    <ul class="pagination__items">
      <li>
        <router-link
          :disabled="pageNum === 1"
          white
          large
          bg-theme-color
          hover-opacity
          :to="`articles?page=1`"
        >
          1
        </router-link>
      </li>
      <li>
        <app-text
          class="pagination__items__text"
          bold
        >
          ...
        </app-text>
      </li>
      <li
        v-for="page in middlePages"
        :key="page"
      >
        <router-link
          white
          large
          bg-theme-color
          hover-opacity
          :disabled="page === pageNum"
          :to="`/articles?page=${page}`"
        >
          {{ page }}
        </router-link>
      </li>
      <li>
        <app-text
          class="pagination__items__text"
          bold
        >
          ...
        </app-text>
      </li>
      <li>
        <router-link
          white
          large
          bg-theme-color
          hover-opacity
          :disabled="pageNum === lastPage"
          :to="`/articles?page=${lastPage}`"
        >
          {{ lastPage }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  RouterLink,
  Text,
} from '@Components/atoms';

export default {
  components: {
    RouterLink,
    appText: Text,
  },
  props: {
    lastPage: {
      type: Number,
      default: null,
    },
    pageNum: {
      type: Number,
      default: null,
    },
  },
  computed: {
    middlePages() {
      const startIdx = this.pageNum;
      const lastIdx = this.lastPage;
      const allPages = [];
      Array.from({ length: lastIdx }, (_, i) => i + 1).forEach(i => {
        allPages.push(i);
      });
      if (startIdx < 4) {
        return allPages.slice(1, 6);
      }
      if (startIdx < (lastIdx - 3)) {
        return allPages.slice((startIdx - 3), (startIdx + 2));
      }
      return allPages.slice(lastIdx - 6, lastIdx - 1);
    },
  },
};
</script>
<style lang="scss" scoped>
  .pagination {
    &__items {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      & > li {
        margin-left: 20px;
        :first-child {
          margin-left: 0;
        }
      }
      &__text {
        color: $disabled-color;
      }
    }
  }
</style>
