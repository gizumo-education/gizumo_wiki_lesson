<template>
  <div class="article-trash">
    <app-heading :level="1">削除済み記事一覧</app-heading>
    <app-router-link
      to="/articles"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="article-trash__link"
    >
      すべての記事一覧へ戻る
    </app-router-link>
    <table class="article-trash__table">
      <thead class="article-trash__table-head">
        <tr>
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
        class="article-trash__table-body"
      >
        <tr v-for="trash in trashes" :key="trash.id">
          <td>
            <app-text tag="span" small>
              {{ trash.title | omittedText }}
            </app-text>
          </td>
          <td>
            <app-text tag="span" small>
              {{ trash.content | omittedText }}
            </app-text>
          </td>
          <td>
            <app-text tag="span" small>
              {{ trash.createdDate | omittedDate }}
            </app-text>
          </td>
        </tr>
      </transition-group>
    </table>
    <div v-if="errorMessage" class="article-trash__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
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
  filters: {
    omittedText(text) {
      return text.length > 30 ? `${text.slice(0, 30)}...` : text;
    },
    omittedDate(text) {
      return text.length > 10 ? text.slice(0, 10) : text;
    },
  },
  props: {
    theads: {
      type: Array,
      default: () => [],
    },
    trashes: {
      type: Array,
      default: () => [],
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.article-trash {
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  &__link {
    margin-top: 16px;
  }
  &__table {
    width: 100%;
    text-align: left;
    margin-top: 16px;
    background-color: #fff;
    tr {
      border-bottom: 1px solid $separator-color;
    }
    &-head {
      th {
        padding: 5px 10px;
        vertical-align: middle;
      }
    }
    &-body {
      td {
        padding: 10px;
        vertical-align: middle;
      }
      .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
      }
      .fade-enter, .fade-leave-to {
        opacity: 0;
      }
    }
  }
  &__notice {
    margin-top: 16px;
  }
}
</style>
