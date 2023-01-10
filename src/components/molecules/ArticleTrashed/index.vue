<template>
  <div class="article-trashed">
    <app-heading :level="1">削除済記事一覧</app-heading>
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
        class="article-trashed__title article-trashed__list-header-item"
      >
        タイトル
      </app-text>
      <app-text
        class="article-trashed__content article-trashed__list-header-item"
      >
        本文
      </app-text>
      <app-text
        class="article-trashed__date article-trashed__list-header-item"
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
          {{ articleListTitle(article.title) }}
        </app-text>
        <app-text
          class="article-trashed__content"
        >
          {{ articleListContent(article.content) }}
        </app-text>
        <app-text
          class="article-trashed__date"
        >
          {{ articleListDate(article.created_at) }}
        </app-text>
      </app-list-item>
    </transition-group>
  </div>
</template>

<script>
import {
  Heading,
  ListItem,
  RouterLink,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appListItem: ListItem,
    appRouterLink: RouterLink,
    appText: Text,
  },
  props: {
    targetArray: {
      type: Array,
      required: true,
    },
  },
  computed: {
    articleListTitle() {
      return title => {
        if (title.length > 30) {
          return `${title.substring(0, 30)}...`;
        }
        return title;
      };
    },
    articleListContent() {
      return content => {
        if (content.length > 30) {
          return `${content.substring(0, 30)}...`;
        }
        return content;
      };
    },
    articleListDate() {
      const options = {
        year: 'numeric', month: '2-digit', day: '2-digit',
      };
      return date => {
        const ymdDate = new Date(date).toLocaleDateString('ja-JP', options);
        return ymdDate.replaceAll('/', '-');
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  .article-trashed {
    &__list-header {
      color: $theme-color;
      font-weight: $bold;
      margin-top: 16px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      border-bottom: solid 1px $separator-color;
      &-item {
        margin-left: 10px;
      }
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
    &__create-link {
      margin-top: 16px;
    }
    &__notice--create {
      margin-bottom: 16px;
    }
  }
</style>
