<template>
  <div class="pagenation">
    <ul class="pagenation__btn">
      <!-- 1ページ -->
      <li class="pagenation__btn__item">
        <app-button
          :disabled=" pageCurrent === 1 "
          @click="clickPagenation"
        >
          1
        </app-button>
      </li>
      <!-- ... -->
      <li class="pagenation__btn__item">
        <span>・・・</span>
      </li>
      <!-- 現在いるページから前後5ページ -->
      <li
        v-for="pageNum in pageArray"
        :key="pageNum"
        class="pagenation__btn__item"
      >
        <app-button
          :disabled="pageCurrent === pageNum"
          @click="clickPagenation"
        >
          {{ pageNum }}
        </app-button>
      </li>
      <!-- ... -->
      <li class="pagenation__btn__item">
        <span>・・・</span>
      </li>
      <!-- 最後のページ -->
      <li class="pagenation__btn__item">
        <app-button
          :disabled="pageCurrent === pageTotal"
          @click="clickPagenation"
        >
          {{ pageTotal }}
        </app-button>
      </li>
    </ul>
  </div>
</template>

<script>
import { Button } from '@Components/atoms';

export default {
  components: {
    appButton: Button,
  },

  props: {
    pageCurrent: {
      type: Number,
      required: true,
    },
    pageTotal: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      displayPageNum: '',
    };
  },
  computed: {
    pageArray() {
      // 1から34の配列を作成
      const pageAll = [];
      for (let i = 0; i < this.pageTotal; i += 1) {
        pageAll.push(i + 1);
      }
      // 真ん中に表示させる５つの番号
      let pageArray = [];
      if (this.pageCurrent < 4) { // 現在のページが4より小さい時
        pageArray = pageAll.slice(1, 6); // 2 ~６を表示させる
      } else if (this.pageCurrent > this.pageTotal - 3) { // ページ総数(34)の-3(31)より小さい時
        pageArray = pageAll.slice(this.pageTotal - 6, this.pageTotal - 1); // 29~33を真ん中に表示
      } else {
        pageArray = pageAll.slice(this.pageCurrent - 3, this.pageCurrent + 2); // 現在のページから前後2つ表示
      }
      return pageArray;
    },
  },
  methods: {
    clickPagenation($event) {
      this.$emit('click-pagenation', $event);
    },

  },
};
</script>

<style lang="scss" scoped>

  .pagenation {
    padding-top: 30px;

    &__btn {
      display: flex;
      justify-content: center;
      align-items: center;

      &__item {
        margin-left: 30px;

        &:first-child {
          margin-left: 0;
        }
      }
    }
  }

</style>
