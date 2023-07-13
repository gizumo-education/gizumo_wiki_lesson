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
          <app-text tag="span" small>{{ trashed.title | truncate(30) }}</app-text>
        </td>
        <td>
          <app-text tag="span" small>{{ trashed.content | truncate(30) }}</app-text>
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
  filters: {
    truncate(value, limit) {
      if (value.length > limit) {
        return `${value.substring(0, limit)}...`;
      }
      return value;
    },
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
  methods: {
    formatDate(date) {
      const formattedDate = new Date(date);
      const year = formattedDate.getFullYear();
      const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
      const day = String(formattedDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
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
      &.is-disabled {
        color: $disabled-color;
        font-size: 12px;
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
  }
}
</style>
