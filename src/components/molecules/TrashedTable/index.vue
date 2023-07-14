<template>
  <table class="trashed-table">
    <thead class="trashed-table__head">
      <tr>
        <th v-for="(thead, index) in theads" :key="index">
          <app-text tag="span" theme-color bold>
            {{ thead }}
          </app-text>
        </th>
      </tr>
    </thead>
    <transition-group name="fade" tag="tbody" class="trashed-table__body">
      <tr v-for="trashed in targetArray" :key="trashed.id">
        <td>
          <app-text tag="span" small>{{ truncatedValue(trashed.title) }}</app-text>
        </td>
        <td>
          <app-text tag="span" small>{{ truncatedValue(trashed.content) }}</app-text>
        </td>
        <td>
          <app-text tag="span" small>{{ formatDate(trashed.createdAt) }}</app-text>
        </td>
      </tr>
    </transition-group>
  </table>
</template>

<script>
import {
  Text,
} from '@Components/atoms';

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
    truncatedValue() {
      return value => {
        if (value.length > 30) {
          return `${value.substring(0, 30)}...`;
        }
        return value;
      };
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style lang="scss" scoped>
.trashed-table {
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
</style>
