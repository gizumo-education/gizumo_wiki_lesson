<template>
  <section class="trashed-list">
    <app-trashed-list />
    <div class="trashed-list__table">
      <app-trashed-table
        :target-array="trashedList"
        :theads="theads"
      />
    </div>
  </section>
</template>

<script>
import { TrashedList, TrashedTable } from '@Components/molecules';

export default {
  components: {
    appTrashedList: TrashedList,
    appTrashedTable: TrashedTable,
  },
  data() {
    return {
      theads: ['タイトル', '本文', '作成日'],
    };
  },
  computed: {
    trashedList() {
      return this.$store.state.articles.trashedList;
    },
  },
  created() {
    this.$store.dispatch('articles/getAllTrashed');
  },
};
</script>

<style lang="scss" scoped>
.trashed-list {
  &__table {
    margin-top: 20px;
  }
}
</style>
