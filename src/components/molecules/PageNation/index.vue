<template>
  <div class="pageNation">
    <ul class="pageNation__items">
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
          class="pageNation__items__text"
          bold
        >
          ...
        </app-text>
      </li>
      <li
        v-for="page in totalPage"
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
          class="pageNation__items__text"
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
      default() {
        return null;
      },
    },
  },
  computed: {
    totalPage() {
      const startIdx = this.pageNum;
      const lastIdx = this.lastPage;
      const allPages = [];
      let arryPage = [];
      for (let i = 0; i < lastIdx; i += 1) {
        allPages.push(i + 1);
      }
      if (startIdx < 4) {
        arryPage = allPages.slice(1, 6);
      } else if (startIdx < (lastIdx - 3)) {
        arryPage = allPages.slice((startIdx - 3), (startIdx + 2));
      } else {
        arryPage = allPages.slice(lastIdx - 6, lastIdx - 1);
      }
      return arryPage;
    },
  },
};
</script>
<style lang="scss" scoped>
  .pageNation {
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
