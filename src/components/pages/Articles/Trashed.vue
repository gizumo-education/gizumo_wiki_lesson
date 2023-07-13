<template>
  <section class="trashed-list">
    <app-trashed-list
      :error-message="errorMessage"
      :done-message="doneMessage"
    />
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
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appTrashedList: TrashedList,
    appTrashedTable: TrashedTable,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['タイトル', '本文', '作成日'],
    };
  },
  computed: {
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
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
