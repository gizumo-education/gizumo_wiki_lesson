<template>
  <table class="user-table">
    <thead class="user-table__head">
      <tr>
        <th v-for="(thead, index) in theads" :key="index">
          <app-text tag="span" theme-color bold>
            {{ thead }}
          </app-text>
        </th>
      </tr>
    </thead>
    <transition-group name="fade" tag="tbody" class="user-table__body">
      <tr v-for="user in targetArray" :key="user.id">
        <td :class="user.fullName ? '' : 'is-disabled'">
          <app-text tag="span" small>
            {{ user.fullName || '名前未設定' }}
          </app-text>
        </td>
        <td>
          <app-text tag="span" small>{{ user.accountName }}</app-text>
        </td>
        <td>
          <app-text tag="span" small>{{ user.email }}</app-text>
        </td>
        <td>
          <app-text tag="span" small>{{ user.role.name }}</app-text>
        </td>
        <td>
          <app-router-link
            :to="`/users/${user.id}`"
            theme-color
            underline
            hover-opacity
          >
            詳細
          </app-router-link>
        </td>
        <td>
          <app-button
            bg-danger
            small
            round
            :disabled="!access.delete"
            @click="deleteModal(user.id)"
          >
            削除
          </app-button>
        </td>
      </tr>
    </transition-group>
  </table>
</template>

<script>
import {
  RouterLink,
  Button,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appRouterLink: RouterLink,
    appButton: Button,
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
    access: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    deleteModal(id) {
      if (!this.access.delete) return;
      this.$emit('delete-modal', id);
    },
  },
};
</script>

<style lang="scss" scoped>
.user-table {
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
      overflow: hidden;
      text-overflow: ellipsis;
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
