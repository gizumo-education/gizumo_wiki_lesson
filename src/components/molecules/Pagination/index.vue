<template>
  <div class="pagination">
    <ol
      v-if="!errorMessage"
      class="pagination-list"
    >
      <li class="pagination-list-btn">
        <app-router-link
          :to="'/articles'"
          white
          class="pagination-list-btn_link"
          :class="currentPage === 1 ? 'pagination-list-btn_disabled' : ''"
          :disabled="currentPage === 1"
        >
          1
        </app-router-link>
      </li>
      <li
        v-if="currentPage > 4"
        class="pagination-list-btn pagination-list-dots"
      >
        • • •
      </li>
      <li
        v-for="page in pages"
        :key="page"
        class="pagination-list-btn"
      >
        <app-router-link
          :to="`/articles?page=${page}`"
          white
          class="pagination-list-btn_link"
          :class="currentPage === page ? 'pagination-list-btn_disabled' : ''"
          :disabled="currentPage === page"
        >
          {{ page }}
        </app-router-link>
      </li>
      <li
        v-if="currentPage < totalPage - 3"
        class="pagination-list-btn pagination-list-dots"
      >
        • • •
      </li>
      <li class="pagination-list-btn">
        <app-router-link
          :to="`/articles?page=${totalPage}`"
          white
          class="pagination-list-btn_link"
          :class="currentPage === totalPage ? 'pagination-list-btn_disabled' : ''"
          :disabled="currentPage === totalPage"
        >
          {{ totalPage }}
        </app-router-link>
      </li>
    </ol>
    <div v-if="errorMessage" class="pagination-message">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
  </div>
</template>

<script>
import { RouterLink, Text } from '@Components/atoms';

export default {
  components: {
    appRouterLink: RouterLink,
    appText: Text,
  },
  props: {
    currentPage: {
      type: Number,
      default: null,
    },
    totalPage: {
      type: Number,
      default: null,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  computed: {
    pages() {
      const range = 5;
      let start = '';
      let end = '';
      if (this.currentPage < range) {
        start = 2;
        end = range + 1;
      } else if (this.currentPage > this.totalPage - range + 1) {
        start = this.totalPage - range;
        end = this.totalPage - 1;
      } else {
        start = this.currentPage - Math.floor(range / 2);
        end = this.currentPage + Math.floor(range / 2);
      }
      const currentRange = [];
      for (let i = start; i <= end; i += 1) {
        currentRange.push(i);
      }
      return currentRange;
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination{
  &-list {
    display: flex;
    justify-content: center;
    list-style: none;
    text-align: center;
    margin-top: 30px;
    &-btn {
      width: 56px;
      height: 40px;
      margin-left: 20px;
      &:first-child {
        margin-left: 0;
      }
      &_link {
        width: 100%;
        height: 100%;
        font-size: 16px;
        line-height: 40px;
        background-color: $theme-color;
      }
      &_disabled {
        cursor: default;
        background-color: $disabled-color;
      }
    }
    &-dots {
      width: 40px;
      font-size: 16px;
      line-height: 40px;
      color: $disabled-color;
      background-color: $white;
    }
  }
  &-message {
    margin-top: 20px;
  }
}
</style>
