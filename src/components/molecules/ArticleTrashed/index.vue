<template>
  <div class="article-trashed">
    <app-heading :level="1">
      削除済み記事一覧
    </app-heading>
    <app-router-link
      to="/articles"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="article-trashed__allArticles-link"
    >
      すべての記事一覧へ戻る
    </app-router-link>
    <table class="article-trashed__table">
      <thead class="article-trashed__table__head">
        <tr>
          <th
            v-for="(thead, index) in theads"
            :key="index"
          >
            <app-text
              tag="span"
              theme-color
              bold
            >
              {{ thead }}
            </app-text>
          </th>
        </tr>
      </thead>
      <transition-group name="fade" tag="tbody" class="article-trashed__table__body">
        <tr v-for="article in trashedArticles" :key="article.id">
          <td>
            <app-text small>
              {{ article.title | omittedText }}
            </app-text>
          </td>
          <td>
            <app-text small>
              {{ article.content | omittedText }}
            </app-text>
          </td>
          <td>
            <app-text small>
              {{ article.createdAt | formatDate }}
            </app-text>
          </td>
        </tr>
      </transition-group>
    </table>
  </div>
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
    omittedText(text) {
      const ellipsis = '...';
      return text.length > 30 ? `${text.slice(0, 30)}${ellipsis}` : text;
    },
    formatDate(text) {
      const year = text.slice(0, 4);
      const month = text.slice(5, 7);
      const date = text.slice(8, 10);
      return `${year}-${month}-${date}`;
    },
  },
  props: {
    theads: {
      type: Array,
      default() {
        return [];
      },
    },
    trashedArticles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
  .article-trashed {
    &__allArticles-link {
      margin-top: 16px;
    }

    &__table {
      width: 100%;
      margin-top: 16px;
      text-align: left;
      tr {
        border-bottom: 1px solid $separator-color;
      }
      &__head {
        th {
          padding: 0 10px 5px;
          vertical-align: middle;
        }
      }
      &__body {
        td {
          padding: 5px;
          vertical-align: middle;
        }
        .fade-enter-active, .fade-leave-active {
          transition: opacity .5s;
        }
        .fade-enter, .fade-leave-to {
          opacity: 0;
        }
      }
    }
  }
</style>
