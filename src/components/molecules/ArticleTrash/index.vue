<template>
  <div class="trash-page">
    <app-heading :level="1">削除済み記事一覧</app-heading>
    <app-router-link
      to="/articles"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="trash-page__back"
    >
      全ての記事一覧へ戻る
    </app-router-link>
    <div class="trash-page__list">
      <table class="trash-page__list__table">
        <thead class="trash-page__list__table__head">
          <tr>
            <th
              v-for="(thead, index) in theads"
              :key="index"
            >
              <app-text tag="span" theme-color bold>
                {{ thead }}
              </app-text>
            </th>
          </tr>
        </thead>

        <transition-group
          class="trash-page__list__table__body"
          name="fade"
          tag="tbody"
        >
          <tr
            v-for="trash in trashList"
            :key="trash.title"
            flex
            beetween
            align-items
            bg-white
            large
            border-bottom-gray
          >
            <td>
              <app-text
                class="article-list__title"
              >
                {{ trash.title }}
              </app-text>
            </td>
            <td>
              <app-text
                class="article-list__title"
              >
                {{ trash.content }}
              </app-text>
            </td>
            <td>
              <app-text
                class="article-list__title"
              >
                {{ trash.created_at }}
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

export default {
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
    appText: Text,
  },
  props: {
    trashList: {
      type: Array,
      default: () => [],
    },
    theads: {
      type: Array,
      default: () => [],
    },
  },
};

</script>

<style lang="scss" scoped>

.trash-page{

  &__back {
    margin-top: 16px;
  }

  &__list {
    margin-top: 20px;

    &__table {
      width: 100%;

      tr {
        border-bottom: 1px solid $separator-color;
      }
      &__head {
        th {
          padding: 5px 10px;
          vertical-align: middle;
          text-align: left;
        }
      }
      &__body {
        td {
          padding: 10px;
          vertical-align: left;
        }
      }
    }
  }
}
</style>
