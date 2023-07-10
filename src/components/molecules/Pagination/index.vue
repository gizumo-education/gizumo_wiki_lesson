<template>
  <div v-if="totalPages">
    <div>
      <nav class="pagination">
        <ul class="pagination__list">
          <li
            class="pagination__list__btn pagination__list__first"
            :class="{ 'pagination__list__disabled': 1 === currentPage }"
          >
            <template v-if="1 === currentPage">
              <span>1</span>
            </template>
            <app-router-link
              v-else
              :to="getArticlePath(1)"
              @click.prevent="setPage(1)"
            >
              1
            </app-router-link>
          </li>
          <li class="pagination__list__skip">…</li>
          <li
            v-for="num in showPagesFix"
            :key="num"
            class="pagination__list__btn"
            :class="{ 'pagination__list__disabled': numFix(num) === currentPage }"
          >
            <template v-if="numFix(num) === currentPage">
              <span>{{ numFix(num) }}</span>
            </template>
            <app-router-link
              v-else
              :to="getArticlePath(numFix(num))"
              @click.prevent="setPage(numFix(num))"
            >
              {{ numFix(num) }}
            </app-router-link>
          </li>
          <li class="pagination__list__skip">…</li>
          <li
            class="pagination__list__btn pagination__list__last"
            :class="{'pagination__list__disabled': totalPages === currentPage}"
          >
            <template
              v-if="totalPages === currentPage"
            >
              <span>{{ totalPages }}</span>
            </template>
            <app-router-link
              v-else
              :to="getArticlePath(totalPages)"
              @click.prevent="setPage(totalPages)"
            >
              {{ totalPages }}
            </app-router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { RouterLink } from '@Components/atoms';

export default {
  components: {
    appRouterLink: RouterLink,
  },
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalCount: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    showPages() {
      return 5;
    },
    numFix() {
      return num => {
        const ajust = 1 + (this.showPages - 1) / 2;
        let result = num + 1;
        if (this.currentPage >= this.showPages / 2 && this.currentPage !== 3) {
          result = num + this.currentPage - ajust;
        }
        if (this.currentPage + this.showPages / 2 > this.totalPages) {
          result = this.totalPages - this.showPages + num - 1;
        }
        if (this.totalPages <= this.showPages) {
          result = num;
        }
        return result;
      };
    },
    showPagesFix() {
      if (this.totalPages < this.showPages) {
        return this.totalPages;
      }
      return this.showPages;
    },
  },
  methods: {
    getArticlePath(page) {
      return `/articles?page=${page}`;
    },
    setPage(page) {
      this.$emit('current-page', page);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  &__list {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    font-size: 16px;
    line-height: 1;
    &__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
      text-align: center;
      color: $white;
      & a {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 20px;
      color: $white;
      @include hoverOpacity;
      background-color: $theme-color;
      }
      &:nth-child(1) {
        margin-right: 0;
      }
      &:nth-child(7) {
        margin-right: 0;
      }
    }
    &__skip {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 20px;
      text-align: center;
      color: $disabled-color;
    }
    &__last {
      margin-right: 0;
    }
    &__disabled {
      padding: 5px 20px;
      background-color: $disabled-color;
    }
  }
}
</style>
