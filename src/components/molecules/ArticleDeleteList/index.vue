<template>
  <div class="article-list">
    <app-heading :level="1">削除済み記事一覧</app-heading>
    <div class="article-list__box">
      <app-router-link
        to="/articles"
        key-color
        white
        bg-lightgreen
        small
        round
        hover-opacity
        class="article-list__link"
      >
        すべての記事一覧へ戻る
      </app-router-link>
      <table class="article-list__table">
        <thead class="article-list__title">
          <tr>
            <th v-for="(thead, index) in theads" :key="index">
              <app-text tag="span" theme-color bold>
                {{ thead }}
              </app-text>
            </th>
          </tr>
        </thead>
        <transition-group name="fade" tag="tbody" class="article-list__delete-list">
          <tr v-for="articles in deleteList" :key="articles.id">
            <td>
              <app-text tag="span" small>
                {{ deleteText(articles.title) }}
              </app-text>
            </td>
            <td>
              <app-text tag="span" small class="article-list__content">
                {{ deleteText(articles.content) }}
              </app-text>
            </td>
            <td>
              <app-text tag="span" small class="article-list__created">
                {{ formatDate(articles.created_at) }}
              </app-text>
            </td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script>
import {
  Heading,
  RouterLink,
  Text,
} from '@Components/atoms';
import dayjs from 'dayjs';

export default {
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
    appText: Text,
  },
  props: {
    deleteList: {
      type: Array,
      required: true,
    },
    theads: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    deleteText() {
      return trashedText => {
        if (trashedText.length > 30) {
          return `${trashedText.slice(0, 30)}...`;
        }
        return trashedText;
      };
    },
  },
  methods: {
    formatDate: dateStr => dayjs(dateStr).format('YYYY-MM-DD'),
  },
};
</script>

<style lang="scss" scoped>
  .article-list {
    &__title {
      th {
        text-align: start;
        padding-left: 15%;
        &:first-child {
          padding-left: 0;
        }
        &:last-child {
          float: right;
          margin-right: 30px;
        }
      }
    }
    &__link {
      margin-top: 10px;
    }
    &__table {
      margin-top: 10px;
      margin-left: 10px;
      width: 100%;
    }
    &__delete-list {
      tr {
        border-bottom: 1px solid $separator-color;
      }
      td {
        padding: 5px;
        vertical-align: bottom;
      }
    }
    &__content {
      margin-left: 20%;
    }
    &__created {
      margin-right: 10px;
      float: right;
    }
  }
</style>
