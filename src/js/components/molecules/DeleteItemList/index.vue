<template>
  <div>
    <app-heading :level="1">記事削除済み一覧</app-heading>
    <ul class="delete-items">
      <li
      v-for="deleteItem in deleteItems"
      :key="deleteItem.id"
      class="delete-items__lists"
      >
        <app-text tag="p">
          {{ deleteItem.created_at.slice(0,10) }}
        </app-text>
        <app-text tag="h1" exLarge>
          {{ deleteItem.title }}
        </app-text>
        <app-text tag="p">
          {{ deleteItem.content }}
        </app-text>
        <div class="delete-items__lists__line"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Text, Heading } from '@Components/atoms';

export default {
  components: {
    appText: Text,
    appHeading: Heading,
  },
  props: {
    deleteItems: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="postcss" scoped>

  .delete-items {
    &__lists {
      margin-top: 30px;
      &__line {
        margin-top: 10px;
        width: 100%;
        border-bottom: 1px solid rgb(224, 222, 222);
      }
    }
  }

</style>
