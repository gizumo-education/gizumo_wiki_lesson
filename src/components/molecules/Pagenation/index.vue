<template>
  <div v-if="totalPages">
    <div>
      <nav class="pagenation">
        <ul class="pagenation__list">
          <li class="pagenation__list__btn pagenation__list__first">1</li>
          <li class="pagenation__list__skip">…</li>
          <li
            v-for="num in showPagesFix"
            :key="num"
            class="pagenation__list__btn"
            :class="{ 'pagenation__list__disabled': numFix(num) === currentPage }"
          >
            <template v-if="numFix(num) == currentPage">
              <span>{{ numFix(num) }}</span>
            </template>
            <a v-else href="#" @click.prevent="setPage(numFix(num))">{{ numFix(num) }}</a>
          </li>
          <li class="pagenation__list__skip">…</li>
          <li
            class="pagenation__list__btn  pagenation__list__last"
            :class="{'disabled': currentPage == totalPages}"
          >
            {{ totalPages }}
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showPages: {
      type: Number,
      default: 1,
    },
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
    numFix() {
      return num => {
        const ajust = 1 + (this.showPages - 1) / 2;
        let result = num;
        if (this.currentPage > this.showPages / 2) {
          result = num + this.currentPage - ajust;
        }
        if (this.currentPage + this.showPages / 2 > this.totalPages) {
          result = this.totalPages - this.showPages + num;
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
    setPage(page) {
      this.$emit('current-page', page);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagenation {
  &__list {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    font-size: 16px;
    &__first {
      padding: 5px 20px;
      background-color: $theme-color;
    }
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
      padding: 5px 20px;
      margin-right: 0;
      background-color: $theme-color;
    }
    &__disabled {
      padding: 5px 20px;
      background-color: $disabled-color;
    }
  }
}
</style>
