<template>
  <div class="article-trashed">
    <div v-if="doneMessage" class="article-trashed__notice--create">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
    <app-heading :level="1">{{ articleTitle }}</app-heading>
    <app-router-link
      to="/articles"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="article-trashed__create-link"
    >
      全ての記事一覧へ戻る
    </app-router-link>
    <div class="article-trashed__list-header">
      <app-text>
        タイトル
      </app-text>
      <app-text>
        本文
      </app-text>
      <app-text>
        作成日
      </app-text>
    </div>
    <transition-group
      class="article-trashed__articles"
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
          class="article-trashed__title"
        >
          {{ article.title }}
        </app-text>
        <app-text
          class="article-trashed__title"
        >
          内容
        </app-text>
        <app-text
          class="article-trashed__title"
        >
          作成日
        </app-text>
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
      type: Object,
      default: () => {},
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
      return `${this.title}一覧`;
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
  .article-trashed {
    &__articles {
      .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
      }
    }
    &__list-header {
      display: flex;
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
</style>
