<template>
  <div class="article-list">
    <div v-if="errorMessage" class="article-list__notice--error">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
    <app-heading :level="1">削除済み記事の一覧</app-heading>
    <app-router-link
      to="/articles"
      class="article-list__link"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
    >
      すべての記事一覧へ戻る
    </app-router-link>
    <table class="article-list__table">
      <thead class="article-list__table__head">
        <tr>
          <th v-for="item in $options.theads" :key="item">
            <app-text tag="span" theme-color bold>
              {{ item }}
            </app-text>
          </th>
        </tr>
      </thead>
      <transition-group
        class="article-list__table__body"
        name="fade"
        tag="tbody"
      >
        <tr v-for="article in targetArray" :key="article.id">
          <td>
            <app-text tag="span" small>
              {{
                shortenStrWithEllipsis(article.title)
              }}
            </app-text>
          </td>
          <td>
            <app-text tag="span" small>
              {{
                shortenStrWithEllipsis(article.content)
              }}
            </app-text>
          </td>
          <td>
            <app-text tag="span" small>
              {{ article.created_at.slice(0, 10) }}
            </app-text>
          </td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<script>
import { Heading, RouterLink, Text } from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
    appText: Text,
  },
  theads: ['タイトル', '本文', '作成日'],
  props: {
    targetArray: {
      type: Array,
      default: () => [],
    },
    borderGray: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  computed: {
    shortenStrWithEllipsis() {
      return str => {
        if (str.length <= 30) return str;
        return `${str.slice(0, 30)}…`;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.article-list {
  &__notice--error {
    margin-bottom: 16px;
  }
  &__link {
    margin-top: 16px;
  }
  &__table {
    width: 100%;
    text-align: left;
    background-color: #fff;
    margin-top: 16px;
    tr {
      border-bottom: 1px solid $separator-color;
    }
    &__head {
      th {
        padding: 5px 10px;
        vertical-align: middle;
      }
    }
    &__body {
      td {
        padding: 10px;
        vertical-align: middle;
      }
    }
  }
}
</style>
