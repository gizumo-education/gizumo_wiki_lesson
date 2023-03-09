<template>
  <div class="pagination">
    <p v-show="pageNum < pageTotal" class="page-text">
      全 {{ articleTotal }} 件中 {{ (pageNum-1)*30+1 }} 〜 {{ pageNum*30 }} 件を表示
    </p>
    <p v-show="pageNum === pageTotal" class="page-text">
      全 {{ articleTotal }} 件中 {{ (pageNum-1)*30+1 }} 〜 {{ articleTotal }} 件を表示
    </p>
    <ul
      class="page-list"
    >
      <li
        v-show="pageNum>1"
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
        v-show="pageNum > 4"
        class="page-list__dots"
      >
        ...
      </span>
      <li
        v-show="pageNum>3"
        class="page-list__item"
      >
        <router-link
          :to="`articles?page=${pageNum-2}`"
          class="page-list__link"
        >
          {{ pageNum-2 }}
        </router-link>
      </li>
      <li
        v-show="pageNum>2"
        class="page-list__item"
      >
        <router-link
          :to="`articles?page=${pageNum-1}`"
          class="page-list__link"
        >
          {{ pageNum-1 }}
        </router-link>
      </li>
      <li class="page-list__current"><p>{{ pageNum }}</p></li>
      <li
        v-show="pageNum<pageTotal-1"
        class="page-list__item"
      >
        <router-link
          :to="`articles?page=${pageNum+1}`"
          class="page-list__link"
        >
          {{ pageNum+1 }}
        </router-link>
      </li>
      <li
        v-show="pageNum<pageTotal-2"
        class="page-list__item"
      >
        <router-link
          :to="`articles?page=${pageNum+2}`"
          class="page-list__link"
        >
          {{ pageNum+2 }}
        </router-link>
      </li>
      <span
        v-show="pageTotal-3> pageNum"
        class="page-list__dots"
      >
        ...
      </span>
      <li
        v-show="pageNum<pageTotal"
        class="page-list__item"
      >
        <router-link
          :to="`articles?page=${pageTotal}`"
          class="page-list__link"
        >
          {{ pageTotal }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pageTotal: {
      type: Number,
      default: 1,
    },
    pageNum: {
      type: Number,
      default: 1,
    },
    articleTotal: {
      type: Number,
      default: 1,
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
    width: 40px;
    margin-left: 10px;
    background-color: $disabled-color;
    color: #fff;
    font-size: 14px;
    text-align: center;
    padding: 10px auto;
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
