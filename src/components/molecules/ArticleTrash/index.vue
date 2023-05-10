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
        <tr v-for="trash in omittedTrashes" :key="trash.id">
          <td>
            <app-text tag="span" small>
              {{ trash.title }}
            </app-text>
          </td>
          <td>
            <app-text tag="span" small>
              {{ trash.text }}
            </app-text>
          </td>
          <td>
            <app-text tag="span" small>
              {{ trash.date }}
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
  computed: {
    omittedTrashes() {
      const omittedTrashes = this.trashes.map(data => ({
        id: data.id,
        title: data.title.length > 30 ? `${data.title.slice(0, 30)}...` : data.title,
        text: data.content.length > 30 ? `${data.content.slice(0, 30)}...` : data.content,
        date: data.createdDate.length > 10
          ? data.createdDate.slice(0, 10) : data.createdDate,
      }));
      return omittedTrashes;
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
