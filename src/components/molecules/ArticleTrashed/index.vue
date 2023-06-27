<template>
  <div class="article__trashed">
    <app-heading :level="1"> {{ articleTitle }} </app-heading>
    <app-router-link
      :to="'/articles'"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="article__trashed margin-top"
    >
      記事一覧へ戻る
    </app-router-link>
    <table class="article-table">
      <thead class="article-table__head">
        <tr>
          <th v-for="(thead, index) in theads" :key="index">
            <app-text tag="span" theme-color bold>
              {{ thead }}
            </app-text>
          </th>
        </tr>
      </thead>
      <transition-group name="fade" tag="tbody" class="article-table__body">
        <tr v-for="article in targetArray" :key="article.id">
          <td>
            <!-- タイトル -->
            <app-text
              v-if="article.title.length > 30"
              tag="span"
              small
            >
              {{ article.title.slice(0, 30) + '...' }}
            </app-text>
            <app-text
              v-if="article.title.length <= 30"
              tag="span"
              small
            >
              {{ article.title.slice(0, 30) }}
            </app-text>
          </td>
          <td>
            <!-- 本文 -->
            <app-text
              v-if="article.content.length > 30"
              tag="span"
              small
            >
              {{ article.content.slice(0, 30) + '...' }}
            </app-text>
            <app-text
              v-if="article.content.length <= 30"
              tag="span"
              small
            >
              {{ article.content.slice(0, 30) }}
            </app-text>
          </td>
          <td>
            <!-- 作成日-->
            <app-text>
              {{ article.created_at.slice(0, 10) }}
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
  Text,
  RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appText: Text,
    appRouterLink: RouterLink,
  },
  props: {
    title: {
      type: String,
      default: '削除済み記事',
    },
    theads: {
      type: Array,
      default: () => [],
    },
    targetArray: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    articleTitle() {
      return `${this.title}一覧`;
    },
  },
};
</script>

<style lang="scss" scoped>
.article-table {
  width: 100%;
  text-align: left;
  background-color: #fff;
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
.margin-top {
  margin-top: 20px;
}
</style>
