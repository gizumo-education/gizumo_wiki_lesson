<template>
  <div class="article-trashed">
    <div v-if="errorMessage" class="category-management-list__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
    <app-heading :level="1">削除済み記事一覧</app-heading>
    <app-router-link
      to="/articles"
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="article-trashed__btn"
    >
      すべての記事一覧へ戻る
    </app-router-link>
    <div class="article-trashed__main">
      <table>
        <thead>
          <tr>
            <th>
              <app-text theme-color bold>タイトル</app-text>
            </th>
            <th>
              <app-text theme-color bold>本文</app-text>
            </th>
            <th>
              <app-text theme-color bold>作成日</app-text>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in targetArray" :key="article.id">
            <td>
              <app-text tag="span" small>
                {{ truncatedTitle(article.title) }}
              </app-text>
            </td>
            <td>
              <app-text tag="span" small>
                {{ truncatedContent(article.content) }}
              </app-text>
            </td>
            <td>
              <app-text tag="span" small>
                {{ formattedDate(article.created_at) }}
              </app-text>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {
  Heading,
  RouterLink,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
    appText: Text,
  },
  props: {
    targetArray: {
      type: Array,
      default: () => [],
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  computed: {
    truncatedTitle() {
      return title => this.truncateText(title, 30);
    },
    truncatedContent() {
      return content => this.truncateText(content, 30);
    },
    formattedDate() {
      return date => this.formatDate(date);
    },
  },
  methods: {
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return `${text.substring(0, maxLength)}...`;
      }
      return text;
    },
    formatDate(date) {
      const formattedDate = new Date(date);
      const year = formattedDate.getFullYear();
      const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
      const day = String(formattedDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.article-trashed {
  &__btn {
    margin-top: 16px;
  }
  &__main {
    margin-top: 16px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 10px;
    text-align: left;
  }
  th {
    border-bottom: 1px solid $separator-color;
  }
  tr {
    border-bottom: 1px solid $separator-color;
  }
  &__notice--create {
    margin-top: 16px;
  }
}
</style>
