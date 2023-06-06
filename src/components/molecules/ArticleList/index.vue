<template>
  <div class="article-list">
    <div v-if="doneMessage" class="article-list__notice--create">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
    <app-heading :level="1">{{ articleTitle }}</app-heading>
    <app-router-link
      to="articles/post"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="article-list__create-link"
    >
      新しいドキュメントを作る
    </app-router-link>
    <transition-group
      class="article-list__articles"
      name="fade"
      tag="ul"
    >
      <app-list-item
        v-for="article in targetArray"
        :key="article.id"
        flex
        beetween
        align-items
        bg-white
        large
        border-bottom-gray
      >
        <app-text
          class="article-list__title"
        >
          {{ article.title }}
        </app-text>
        <div class="article-list__links">
          <app-router-link
            :to="`/articles/${article.id}`"
            theme-color
            underline
            hover-opacity
          >
            詳細
          </app-router-link>
          <app-router-link
            :to="`/articles/${article.id}/edit`"
            white
            bg-lightgreen
            small
            round
            hover-opacity
          >
            更新
          </app-router-link>
          <app-button
            bg-danger
            small
            round
            hover-opacity
            :disabled="!access.delete"
            @click="openModal(article.id)"
          >
            {{ buttonText }}
          </app-button>
        </div>
      </app-list-item>
    </transition-group>
    <app-modal>
      <app-text
        ex-large
      >
        本当に削除しますか?
      </app-text>
      <app-button
        bg-danger
        @click="$emit('handle-click')"
      >
        削除
      </app-button>
    </app-modal>
    <app-pagination class="pagination">
      <app-button
        class="pagination__button"
        :disabled="currentPage === 1"
        @click="goToPage(1)"
      >
        1
      </app-button>
      <span class="pagination__span">...</span>
      <app-button
        v-for="page in generatePageNumbers()"
        :key="page"
        class="pagination__button"
        :disabled="currentPage === page"
        @click="goToPage(page)"
      >
        {{ page }}
      </app-button>
      <span
        v-if="totalPages > 1"
        class="pagination__span"
      >...</span>
      <app-button
        v-if="totalPages > 1"
        class="pagination__button"
        :disabled="currentPage === totalPages"
        @click="goToPage(totalPages)"
      >
        {{ totalPages }}
      </app-button>
    </app-pagination>
  </div>
</template>

<script>
import {
  Heading,
  ListItem,
  RouterLink,
  Button,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appListItem: ListItem,
    appRouterLink: RouterLink,
    appButton: Button,
    appText: Text,
  },
  props: {
    className: {
      type: String,
      default: '',
    },
    targetArray: {
      type: Array,
      default: () => [],
    },
    borderGray: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'すべて',
    },
    doneMessage: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: 10,
      // defaultは仮
    },
    visiblePages: {
      type: Number,
      default: 7,
    },
  },
  data() {
    return {
      pageNumbers: [],
    };
  },
  computed: {
    articleTitle() {
      return `${this.title}の一覧`;
    },
    buttonText() {
      return this.access.delete ? '削除' : '削除権限がありません';
    },
  },
  methods: {
    openModal(articleId) {
      if (!this.access.delete) return;
      this.$emit('open-modal', articleId);
    },
    goToPage(pageNumber) {
      this.$emit('go-to-page', pageNumber);
    },
    generatePageNumbers() {
      this.$emit('generate-page-numbers');
      // console.log(99)
    },
    // goToPage(pageNumber) {
    //   this.currentPage = pageNumber;
    // },
    // isFirstPageVisible() {
    //   return this.currentPage > Math.floor(this.visiblePages / 2) + 1;
    // },
    // isLastPageVisible() {
    //   return this.totalPages - this.currentPage >= Math.floor(this.visiblePages / 2);
    // },
    // generatePageNumbers() {
    //   const pageNumbers = [];
    //   let startPage = 1;
    //   let endPage = this.totalPages;

    //   if (this.totalPages > this.visiblePages) {
    //     const maxVisiblePages = this.visiblePages - 2;
    //     const offset = Math.floor(maxVisiblePages / 2);

    //     if (this.isFirstPageVisible()) {
    //       startPage = this.currentPage - offset;
    //       endPage = this.currentPage + offset;

    //       if (endPage > this.totalPages) {
    //         endPage = this.totalPages;
    //         startPage = endPage - maxVisiblePages + 1;
    //       }
    //     } else if (this.isLastPageVisible()) {
    //       endPage = this.currentPage + offset;
    //       startPage = endPage - maxVisiblePages + 1;

    //       if (startPage < 1) {
    //         startPage = 1;
    //         endPage = startPage + maxVisiblePages - 1;
    //       }
    //     }
    //   }

    //   for (let i = startPage; i <= endPage; i += 1) {
    //     pageNumbers.push(i);
    //   }

    //   return pageNumbers;
    // },
  },
};
</script>

<style lang="scss" scoped>
  .article-list {
    &__articles {
      margin-top: 16px;
      .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
      }
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
    &__title {
      width: 60%;
    }
    &__create-link {
      margin-top: 16px;
    }
    &__links {
      *:not(first-child) {
        margin-left: 16px;
      }
    }
    &__notice--create {
      margin-bottom: 16px;
    }
  }

  .pagination {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    &__button {
      margin: 0 10px 0;
    }
    &__span {
      margin: 0 15px;
      font-size: 22px;
      opacity: 0.5;
    }
  }
</style>
