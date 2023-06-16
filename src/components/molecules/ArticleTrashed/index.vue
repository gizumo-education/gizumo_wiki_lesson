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
              {{ article.title | readMore(30) }}
            </app-text>
          </td>
          <td class="trash-list__table__tr__td">
            <app-text
              small
            >
              {{ article.content | readMore(30) }}
            </app-text>
          </td>
          <td class="trash-list__table__tr__td">
            <app-text
              small
            >
              {{ article.created_at | textLimit(10) }}
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
  filters: {
    readMore(text, maxLength) {
      if (text.length > maxLength) {
        return `${text.substring(0, maxLength)}...`;
      }
      return text;
    },
    textLimit(text, maxLength) {
      return text.substring(0, maxLength);
    },
  },
  props: {
    theads: {
      type: Array,
      default: () => [],
    },
    trashedArticles: {
      type: Array,
      default: () => [],
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
