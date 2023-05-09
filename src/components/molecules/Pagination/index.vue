<template>
  <div class="pagination">
    <ol class="pagination-list">
      <li class="pagination-list-btn">
        <app-router-link
          :to="path"
          white
          :class="[
            'pagination-list-btn_link',
            {'pagination-list-btn_disabled': currentPage === 1 }
          ]"
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
          :to="path + `?page=${page}`"
          white
          :class="[
            'pagination-list-btn_link',
            {'pagination-list-btn_disabled': currentPage === page }
          ]"
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
          :to="path + `?page=${totalPage}`"
          white
          :class="[
            'pagination-list-btn_link',
            {'pagination-list-btn_disabled': currentPage === totalPage }
          ]"
          :disabled="currentPage === totalPage"
        >
          {{ totalPage }}
        </app-router-link>
      </li>
    </ol>
  </div>
</template>

<script>
import { RouterLink } from '@Components/atoms';

export default {
  components: {
    appRouterLink: RouterLink,
  },
  props: {
    path: {
      type: String,
      default: '',
    },
    currentPage: {
      type: Number,
      required: true,
    },
    totalPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pages() {
      const range = 5;
      const totalRange = [...Array(this.totalPage)].map((_, i) => i + 1);
      if (this.currentPage < range) {
        return totalRange.splice(1, range);
      }
      if (this.currentPage > this.totalPage - range + 1) {
        return totalRange.splice(this.totalPage - range - 1, range);
      }
      return totalRange.splice(this.currentPage - 3, range);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
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
        transition: opacity .5s;
        &:hover {
          opacity: .7;
        }
      }
      &_disabled {
        cursor: default;
        background-color: $disabled-color;
        transition: none;
        &:hover {
          opacity: 1;
        }
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
}
</style>
