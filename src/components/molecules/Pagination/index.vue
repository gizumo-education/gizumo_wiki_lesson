<template>
  <div class="pagination">
    <app-button
      :disabled="queryPage === firstPage"
      @click="clickPagination($event)"
    >
      {{ firstPage }}
    </app-button>
    <app-text
      class="pagination--omit"
      bold
    >
      …
    </app-text>
    <app-button
      v-for="pageNumber in pageArray"
      :key="pageNumber"
      :disabled="queryPage === pageNumber"
      @click="clickPagination($event)"
    >
      {{ pageNumber }}
    </app-button>
    <app-text
      class="pagination--omit"
      bold
    >
      …
    </app-text>
    <app-button
      :disabled="queryPage === lastPage"
      @click="clickPagination($event)"
    >
      {{ lastPage }}
    </app-button>
  </div>
</template>
<script>
import { Button, Text } from '@Components/atoms';

export default {
  components: {
    appButton: Button,
    appText: Text,
  },
  props: {
    firstPage: {
      type: Number,
      required: true,
    },
    lastPage: {
      type: Number,
      required: true,
    },
    queryPage: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      wholePage: [],
    };
  },
  computed: {
    pageArray() {
      const wholePage = [];
      const thisPage = this.queryPage;
      let basisPage = 0;
      const quantity = 5;
      if (this.queryPage <= 4) {
        basisPage = this.firstPage + 1;
        for (let i = 0; i < quantity; i += 1) {
          wholePage[i] = basisPage;
          basisPage += 1;
        }
      } else if (thisPage >= this.lastPage - 3) {
        basisPage = this.lastPage - 5;
        for (let i = 0; i < quantity; i += 1) {
          wholePage[i] = basisPage;
          basisPage += 1;
        }
      } else {
        basisPage = thisPage - 2;
        for (let i = 0; i < quantity; i += 1) {
          wholePage[i] = basisPage;
          basisPage += 1;
        }
      }
      return wholePage;
    },
  },
  methods: {
    clickPagination($event) {
      const clickedPage = parseInt($event.target.innerHTML, 10);
      if (clickedPage !== this.queryPage) {
        this.$emit('move-article-page', $event);
      }
    },
    // makePageArray() {
    //   const wholePage = [];
    //   let thisPage = this.queryPage;
    //   let basisPage = 0;
    //   const quantity = 5;
    //   if (this.queryPage <= 4) {
    //     basisPage = this.firstPage + 1;
    //     for (let i = 0; i < quantity; i += 1) {
    //       wholePage[i] = basisPage;
    //       basisPage += 1;
    //     }
    //     console.log(wholePage);
    //   } else if (thisPage >= this.lastPage - 3) {
    //     basisPage = this.lastPage;
    //     for (let i = 0; i < quantity; i += 1) {
    //       wholePage[i] = basisPage;
    //       basisPage += 1;
    //     }
    //     console.log(wholePage);
    //   } else {
    //     basisPage = thisPage - 2;
    //     for (let i = 0; i < quantity; i += 1) {
    //       wholePage[i] = basisPage;
    //       basisPage += 1;
    //     }
    //     console.log(wholePage);
    //   }
    //   this.wholePage = wholePage;
    // },
  },
};
</script>
<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 36px;
  text-align: center;

  &--omit {
    color: #aeaeae;
    font-size: 20px;
    padding-top: 4px;
  }
}
</style>
