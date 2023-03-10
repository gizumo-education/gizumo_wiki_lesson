<template>
  <div class="pagination">
    <p v-show="pageNum < pageTotal" class="page-text">
      全 {{ articleTotal }} 件中 {{ (pageNum-1)*30+1 }} 〜 {{ pageNum*30 }} 件を表示
    </p>
    <p v-show="pageNum === pageTotal" class="page-text">
      全 {{ articleTotal }} 件中 {{ (pageNum-1)*30+1 }} 〜 {{ articleTotal }} 件を表示
    </p>
    <ol
      class="page-list"
    >
      <li
        v-show="pageNum > 3"
        class="page-list__item"
      >
        <router-link
          to="articles"
          class="page-list__link"
        >
          1
        </router-link>
      </li>
      <span
        v-show="pageNum > 3"
        class="page-list__dots"
      >
        ...
      </span>
      <li
        v-for="page in pages"
        :key="page"
        class="page-list__item"
      >
        <router-link
          :to="`articles?page=${page}`"
          class="page-list__link"
          :class="{'page-list__current' : page===pageNum }"
        >
          {{ page }}
        </router-link>
      </li>
      <span
        v-show="pageNum < pageTotal-2"
        class="page-list__dots"
      >
        ...
      </span>
      <li
        v-show="pageNum < pageTotal-2"
        class="page-list__item"
      >
        <router-link
          :to="`articles?page=${pageTotal}`"
          class="page-list__link"
        >
          {{ pageTotal }}
        </router-link>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props: {
    pageTotal: {
      type: Number,
      default: null,
    },
    pageNum: {
      type: Number,
      default: null,
    },
    articleTotal: {
      type: Number,
      default: null,
    },
  },
  computed: {
    pages() {
      let pages = [];
      if (this.pageNum < 4) {
        pages = [1, 2, 3, 4, 5];
      } else if (this.pageNum > this.pageTotal - 3) {
        pages = [
          this.pageTotal - 4,
          this.pageTotal - 3,
          this.pageTotal - 2,
          this.pageTotal - 1,
          this.pageTotal,
        ];
      } else {
        pages = [
          this.pageNum - 2,
          this.pageNum - 1,
          this.pageNum,
          this.pageNum + 1,
          this.pageNum + 2,
        ];
      }
      return pages;
    },
  },
};
</script>

<style lang="scss" scoped>

.pagination {
  margin-top: 20px;
}
.page-text {
  font-size: 14px;
}
.page-list {
  margin-top: 20px;
  list-style-type: none;
  display: flex;
  justify-content: center;

  &__item {
    width: 40px;
    margin-left: 10px;
    background-color: $theme-color;

    &:first-child {
      margin-left: 0;
    }
  }

  &__current {
    pointer-events: none;
    background-color: $disabled-color;
  }

  &__dots {
    width: 40px;
    margin-left: 10px;
    text-align: center;
  }

  &__link {
    color: #fff;
    font-size: 14px;
    text-align: center;
    width: 100%;
    padding: 10px auto;
  }
}

</style>
