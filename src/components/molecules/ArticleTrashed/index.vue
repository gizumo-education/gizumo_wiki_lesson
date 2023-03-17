<template>
  <div class="article-trashed">
    <app-heading :level="1">削除済み記事一覧</app-heading>
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
      <transition-group
        name="fade"
        tag="tbody"
        class="article-trashed__table__body "
      >
        <tr
          v-for="target in targetArray"
          :key="target.id"
        >
          <td>
            <app-text
              tag="span"
              small
            >
              {{ setSlice( target.title ) }}
            </app-text>
          </td>
          <td>
            <app-text
              tag="span"
              small
            >
              {{ setSlice(target.content) }}
            </app-text>
          </td>
          <td>
            <app-text
              tag="span"
              small
            >
              {{ setData(target.created_at) }}
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
  props: {
    targetArray: {
      type: Array,
      default: () => [],
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
    setSlice() {
      return target => {
        const slicedTarget = target.length > 30 ? `${target.slice(0, 30)}...` : target;
        return slicedTarget;
      };
    },
    setData() {
      return targetData => {
        const slicedTarget = targetData.slice(0, 10);
        return slicedTarget;
      };
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
