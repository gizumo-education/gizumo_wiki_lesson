<template>
  <div class="trashed-list">
    <app-heading :level="1">{{ trashedTitle }}</app-heading>
    <app-router-link
      :to="path"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="trashed-list__link"
    >
      すべての記事一覧へ戻る
    </app-router-link>
    <table class="trashed-list__table">
      <thead class="trashed-list__table-head">
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
        class="trashed-list__table-body"
      >
        <tr v-for="trash in targetArray" :key="trash.id">
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
    <div v-if="errorMessage" class="trashed-list__notice">
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
    path: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    theads: {
      type: Array,
      default: () => [],
    },
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
    trashedTitle() {
      return `削除済み${this.title}一覧`;
    },
  },
};
</script>

<style lang="scss" scoped>
.trashed-list {
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
