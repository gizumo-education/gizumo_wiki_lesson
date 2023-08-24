<template>
  <table class="article-trashed-table">
    <thead class="article-trashed-table__head">
      <tr>
        <th v-for="(thead, index) in theads" :key="index">
          <app-text tag="span" theme-color bold>
            {{ thead }}
          </app-text>
        </th>
      </tr>
    </thead>
    <tbody class="article-trashed-table__body">
      <tr v-for="article in targetArray" :key="article.id">
        <td>
          <app-text tag="span" small>
            {{ textLimit(article.title) }}
          </app-text>
        </td>
        <td>
          <app-text tag="span" small>
            {{ textLimit(article.content) }}
          </app-text>
        </td>
        <td>
          <app-text tag="span" small>
            {{ customFormat(article.created_at) }}
          </app-text>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { Text } from '@Components/atoms';

export default {
  components: {
    appText: Text,
  },
  props: {
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
    textLimit() {
      return text => {
        if (text.length > 30) {
          return `${text.slice(0, 30)}…`;
        }
        return text;
      };
    },
    customFormat() {
      return dateValue => {
        const date = new Date(dateValue);
        return date.toLocaleDateString('sv-SE');
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.article-trashed-table {
  width: 100%;
  text-align: left;
  tr {
    border-bottom: 1px solid $separator-color;
  }
  &__head{
    th {
      padding: 10px;
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
</style>
