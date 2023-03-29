<template>
  <div class="pagination">
    <app-button
      class="pagination__submit"
      button-type="submit"
      :disabled="queryPage === paginationFirstPage"
      @click=" currentPage($event)"
    >
      {{ paginationFirstPage }}
    </app-button>
    <div class="pagination__p">
      <p>...</p>
    </div>
    <app-button
      v-for="page in pagination"
      :key="page.id"
      :disabled="queryPage == page.page"
      class="pagination__submit"
      button-type="submit"
      @click=" currentPage($event)"
    >
      {{ page.page }}
    </app-button>
    <div class="pagination__p">
      <p>...</p>
    </div>
    <app-button
      class="pagination__submit"
      button-type="submit"
      :disabled="queryPage === paginationLastPage"
      @click=" currentPage($event)"
    >
      {{ paginationLastPage }}
    </app-button>
  </div>
</template>

<script>
import {
  Button,
} from '@Components/atoms';

export default {
  components: {
    appButton: Button,
  },
  props: {
    paginationLastPage: {
      type: Number,
      required: true,
    },
    paginationFirstPage: {
      type: Number,
      required: true,
    },
    queryPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pagination() {
      const paginationPage = [
        {
          id: 'one',
          page: '',
        },
        {
          id: 'to',
          page: '',
        },
        {
          id: 'three',
          page: '',
        },
        {
          id: 'four',
          page: '',
        },
        {
          id: 'five',
          page: '',
        },
      ];
      if (this.queryPage < 5) {
        for (let i = 0; i < 5; i += 1) {
          paginationPage[i].page = 2 + i;
        }
      } else if (this.queryPage >= this.paginationLastPage - 2) {
        for (let i = 0; i < 5; i += 1) {
          paginationPage[i].page = this.paginationLastPage - 5 + i;
        }
      } else {
        for (let i = 0; i < 5; i += 1) {
          paginationPage[i].page = this.queryPage - 2 + i;
        }
      }
      return paginationPage;
    },
  },
  methods: {
    currentPage($event) {
      this.$emit('current-page', $event);
    },
  },
};
</script>
<style lang="scss" scoped>
.pagination {
  margin-top: 25px;
  margin-left: 330px;
  display: flex;
  &__submit {
    margin-left: 15px;
  }
  &__p {
    padding: 0;
    margin-top: 3px;
    margin-left:15px;
    color: $disabled-color;
    font-size: 15px;
  }
}
</style>
