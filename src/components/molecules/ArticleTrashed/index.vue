<template>
  <div class="article-trashed">
    <app-heading>削除済み記事一覧</app-heading>
    <div class="article-trashed__button">
      <app-router-link
        to="/articles"
        round
        bg-lightgreen
        white
        small
      >
        すべての記事一覧へ戻る
      </app-router-link>
    </div>

    <table class="article-trashed-table">
      <thead class="article-trashed-table__head">
        <tr class="border-bottom">
          <th v-for="(thead, index) in theads" :key="index">
            <app-text tag="span" theme-color bold>
              {{ thead }}
            </app-text>
          </th>
        </tr>
      </thead>
      <transition-group
        name="fade"
        tag="tbody"
        class="article-trashed-table__body"
      >
        <tr
          v-for="item in articleTrashedList"
          :key="item.id"
        >
          <td class="article-trashed-table__title border-bottom">
            <app-text tag="span" small>
              {{ displayText(item.title) }}
            </app-text>
          </td>
          <td class="article-trashed-table__content border-bottom">
            <app-text tag="span" small>
              {{ displayText(item.content) }}
            </app-text>
          </td>
          <td class="article-trashed-table__date border-bottom">
            <app-text tag="span" small>
              {{ displayDate(item.created_at) }}
            </app-text>
          </td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<script>
import { Heading, Text, RouterLink } from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appText: Text,
    appRouterLink: RouterLink,
  },
  props: {
    articleTrashedList: {
      type: Array,
      default: () => [],
    },
    theads: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    displayText() {
      return trashedText => {
        if (trashedText.length > 30) { // 30文字以上だった場合
          return `${trashedText.slice(0, 30)}...`; // 30文字以降は...にする
        }
        return trashedText; // 30文字未満の場合そのまま表示
      };
    },
    displayDate() {
      return trashedDate => {
        const date = trashedDate.slice(0, 10); // yyyy-mm-ddのみ表示
        return date;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.article-trashed {
  &__button {
    margin-top: 20px;
  }
}
.article-trashed-table {
  width: 100%;
  text-align: left;
  margin-top: 20px;

  &__title {
    width: 30%;
  }

  &__content {
    width: 60%;
  }
  &__date {
    width: 10%;
  }
}

.border-bottom {
  border-bottom: 1px solid #eaeaea;
  padding: 10px 0;
}

</style>
