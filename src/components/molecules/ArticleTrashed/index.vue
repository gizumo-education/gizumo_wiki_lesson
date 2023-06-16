<template>
  <section class="trash-list">
    <app-heading :level="1">削除済み記事一覧</app-heading>
    <app-router-link
      to="/articles"
      small
      white
      bg-lightgreen
      round
      hover-opacity
      class="trash-list__route"
    >
      すべての記事一覧へ戻る
    </app-router-link>
    <table class="trash-list__table">
      <thead>
        <tr class="trash-list__table__tr">
          <th
            v-for="(thead, index) in theads"
            :key="index"
            class="trash-list__table__tr__th"
          >
            <app-text
              theme-color
              bold
            >
              {{ thead }}
            </app-text>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="article in trashedArticles"
          :key="article.id"
          class="trash-list__table__tr"
        >
          <td class="trash-list__table__tr__td">
            <app-text
              small
            >
              {{ readMore(article.title) }}
            </app-text>
          </td>
          <td class="trash-list__table__tr__td">
            <app-text
              small
            >
              {{ readMore(article.content) }}
            </app-text>
          </td>
          <td class="trash-list__table__tr__td">
            <app-text
              small
            >
              {{ textLimit(article.created_at) }}
            </app-text>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import {
  Heading,
  RouterLink,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
    appText: Text,
  },
  props: {
    theads: {
      type: Array,
      default: () => [],
    },
    trashedArticles: {
      type: Array,
      required: true,
    },
  },
  methods: {
    readMore(text) {
      if (text.length > 30) {
        return `${text.substring(0, 30)}...`;
      }
      return text;
    },
    textLimit(text) {
      return text.substring(0, 10);
    },
  },
};
</script>

<style lang="scss" scoped>
  .trash-list {
    &__route {
      margin-top: 20px;
    }
    &__table {
      width: 100%;
      margin-top: 20px;
      &__tr {
        text-align: left;
        border-bottom: 1px solid $separator-color;
        &__th {
          padding: 5px 10px;
        }
        &__td {
          padding: 10px;
          vertical-align: middle;
        }
      }
    }
  }
</style>
