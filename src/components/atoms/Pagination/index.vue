<template>
  <div class="container">
    <ul class="pagenation">
      <li
        class="page-item"
        :class="{disabled: 1 == currentPage }"
      >
        <span v-if="1 == currentPage">1</span>
        <a
          v-else
          href=""
          @click.prevent="setPage(1)"
        >1
        </a>
      </li>
      <li class="page-item point">…</li>
      <li
        v-for="num in showPagesfix"
        :key="num"
        class="page-item link"
        :class="{disabled: numfix(num) == currentPage }"
      >
        <template
          v-if="numfix(num) == currentPage"
        >
          <span>{{ numfix(num) }}</span>
        </template>
        <a
          v-else
          href="#"
          @click.prevent="setPage(numfix(num))"
        >{{ numfix(num) }}</a>
      </li>
      <li class="page-item point">…</li>
      <li
        class="page-item"
        :class="{disabled: lastPage == currentPage }"
      >
        <span v-if="lastPage == currentPage">{{ lastPage }}</span>
        <a
          v-else
          href=""
          @click.prevent="setPage(lastPage)"
        >
          {{ lastPage }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
const showPages = 5;
export default {
  props: {
    currentPage: {
      type: Number,
      default: null,
    },
    totalPage: {
      type: Number,
      default: null,
    },
    lastPage: {
      type: Number,
      default: null,
    },
    perPage: {
      type: Number,
      default: null,
    },
  },
  computed: {
    numfix() {
      return num => {
        const ajust = 1 + (showPages - 1) / 2;
        let result = num + 1;
        if (this.currentPage > showPages / 2 && this.currentPage !== 3) {
          result = num + this.currentPage - ajust;
        }
        if (this.currentPage + showPages / 2 > this.lastPage) {
          result = this.lastPage - showPages + num - 1;
        }
        if (this.lastPage <= showPages) {
          result = num;
        }
        return result;
      };
    },
    showPagesfix() {
      if (this.lastPage < showPages) {
        return this.lastPage;
      }
      return this.showPages;
    },
  },
  methods: {
    setPage(page) {
      if (page <= 0) {
        this.$store.dispatch('articles/setCurrentPage', 1);
      } else if (page > this.lastPage) {
        this.$store.dispatch('articles/setCurrentPage', this.lastPage);
      } else {
        this.$store.dispatch('articles/setCurrentPage', page);
      }
      this.$store.dispatch('articles/getAllArticles', page).then(() => {
        this.$router.push({ path: '/articles', query: { page: this.currentPage } });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
.pagenation {
  display: flex;
}
.page-item {
  color: white;
  & a {
    background-color: $theme-color;
    color: white;
    display: inline-block;
    padding: 1rem 2rem;
    transition: .5s;
    @include hoverOpacity
  }
}
.disabled {
  background-color: $disabled-color;
  padding: 1rem 2rem;
}
.current-page {
  background-color: #c0c6c9;
}

.point {
  color: $disabled-color;
  background-color: $white;
  padding: 1rem 2rem;
}

.link {
  margin-left: 1rem;
}

li:nth-child(3) {
  margin-left: 0;
}
</style>
