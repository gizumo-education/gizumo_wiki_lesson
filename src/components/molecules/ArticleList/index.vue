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
    <pagination-group>
      <app-button
        v-if="targetMeta.current_page === targetMeta.from"
        small
        hover-opacity
        disabled
      >
        {{ targetMeta.from }}
      </app-button>
      <app-button
        v-else
        small
        hover-opacity
      >
        {{ targetMeta.from }}
      </app-button>
      <span
        class="pagination-item-dots"
      >
        …
      </span>
      <div v-for="n in 5" :key="(n)">
        <app-button
          v-if="(((targetMeta.current_page - 3) + n) == targetMeta.current_page)"
          small
          hover-opacity
          disabled
          class="pagination-item"
        >
          {{ (targetMeta.current_page - 3) + n }}
        </app-button>

        <app-button
          v-else
          v-show="(((targetMeta.current_page - 3) + n) >= targetMeta.from
            && ((targetMeta.current_page - 3) + n) <= targetMeta.last_page)"
          small
          hover-opacity
          class="pagination-item"
        >
          {{ (targetMeta.current_page - 3) + n }}
        </app-button>
      </div>
      <span
        class="pagination-item-dots"
      >
        …
      </span>
      <app-button
        v-if="targetMeta.current_page === targetMeta.last_page"
        small
        hover-opacity
        disabled
        class="pagination-item"
      >
        {{ targetMeta.last_page }}
      </app-button>
      <app-button
        v-else
        small
        hover-opacity
        class="pagination-item"
      >
        {{ targetMeta.last_page }}
      </app-button>
    </pagination-group>
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
    targetMeta: {
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
    pagination-group {
      margin-top: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .pagination-item {
      margin-left: 16px;
      &-dots {
        @extend .pagination-item;
        color: gray;
      }
    }
  }
</style>
