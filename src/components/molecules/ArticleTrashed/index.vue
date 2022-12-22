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
      <app-text
        class="article-trashed__title"
      >
        タイトル
      </app-text>
      <app-text
        class="article-trashed__content"
      >
        本文
      </app-text>
      <app-text
        class="article-trashed__date"
      >
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
          class="article-trashed__content"
        >
          {{ article.content }}
        </app-text>
        <app-text
          class="article-trashed__date"
        >
          {{ article.created_at }}
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
      color: $theme-color;
      font-weight: $bold;
      margin-top: 16px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      border-bottom: solid 1px $separator-color;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
    &__title {
      width: 40%;
    }
    &__content {
      width: 50%;
    }
    &__date {
      width: 10%;
    }
    &__notice--create {
      margin-bottom: 16px;
    }
  }
</style>
