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
              <!-- {{ displayDate }} -->
            </app-text>
          </td>
        </tr>
      </transition-group>
    </table>

    <div v-if="errorMessage" class="article-trashed__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
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
    errorMessage: {
      type: String,
      default: '',
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
      return createDate => {
        const trashedDate = new Date(createDate);

        const year = trashedDate.getFullYear();
        const month = `0${trashedDate.getMonth() + 1}`.slice(-2);
        const day = `0${trashedDate.getDate()}`.slice(-2);

        return `${year}-${month}-${day}`;
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

  &__notice {
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
