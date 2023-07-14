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
            {{ truncate(article.title, 30) }}
          </app-text>
        </td>
        <td>
          <app-text tag="span" small>
            {{ truncate(article.content, 30) }}
          </app-text>
        </td>
        <td>
          <app-text tag="span" small>
            {{ formattedDate(article.created_at) }}
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
    targetArray: {
      type: Array,
      default: () => [],
    },
    theads: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    truncate: () => (value, length) => {
      if (value.length > length) {
        return `${value.slice(0, length)}...`;
      }
      return value;
    },
  },
  methods: {
    formattedDate(targetDate) {
      const date = new Date(targetDate);
      return date.toLocaleDateString();
    },
  },
};
</script>

<style lang="scss" scoped>
.article-trashed-table {
  width: 100%;
  text-align: left;
  background-color: $white;
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
</style>
