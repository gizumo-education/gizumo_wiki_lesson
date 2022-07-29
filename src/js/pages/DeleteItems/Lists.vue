<template>
  <app-delete-item-list
    :deleteItems="deleteItemsList"
  />
</template>

<script>
import { DeleteItemList } from '@Components/molecules';

export default {
  components: {
    appDeleteItemList: DeleteItemList,
  },
  computed: {
    deleteItemsList() {
      return this.$store.state.deleteItems.deleteItemsList;
    },
  },
  created() {
    this.$store.dispatch('deleteItems/getAllDeleteItems');
  },
};
</script>
