<template>
  <div class="article-trashed">
    <app-heading :level="1">{{ articleTitle }}</app-heading>
    <div v-if="errorMessage" class="article-trashed__notice--create">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
    <app-router-link
      to="/articles"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="article-trashed__all-link"
    >
      すべての記事一覧へ戻る
    </app-router-link>
    <table class="article-trashed__table">
      <thead class="article-trashed__table__head">
        <tr>
          <th v-for="(thead, index) in theads" :key="index">
            <app-text tag="span" theme-color bold>
              {{ thead }}
            </app-text>
          </th>
        </tr>
      </thead>
      <transition-group name="fade" tag="tbody" class="article-trashed__table__body ">
        <tr v-for="article in targetArray" :key="article.id">
          <td>
            <app-text tag="span" small>
              {{ article.title | setSlice }}
            </app-text>
          </td>
          <td>
            <app-text tag="span" small>
              {{ article.content | setSlice }}
            </app-text>
          </td>
          <td>
            <app-text tag="span" small>
              {{ article.created_at | setData }}
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
    setSlice(value) {
      return value.length > 30 ? `${value.slice(0, 30)}...` : value;
    },
    setData(value) {
      return value.slice(0, 10);
    },
  },
  props: {
    targetArray: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: 'すべて',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    theads: {
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
.article-trashed {
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
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
      }

    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }

    &__title {
      width: 60%;
    }
  }

  &__notice--create {
      margin-top: 16px;
    }

  &__all-link {
      margin-top: 16px;
    }
}
</style>
