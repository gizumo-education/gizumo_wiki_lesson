<template>
  <div class="trashed">
    <app-article-trash
      :trash-list="trashList"
      :theads="theads"
      :error-message="errorMessage"
    />
  </div>
</template>

<script>
import { ArticleTrash } from '@Components/molecules';

export default {
  components: {
    appArticleTrash: ArticleTrash,
  },
  data() {
    return {
      theads: ['タイトル', '本文', '作成日'],
    };
  },
  computed: {
    trashList() {
      const list = this.$store.state.articles.trashList;
      const trashList = list.map(value => ({
        title: value.title.length > 30
          ? `${value.title.slice(0, 30)}...`
          : value.title,
        content: value.content.length > 30
          ? `${value.content.slice(0, 30)}...`
          : value.content,
        created_at: value.created_at.slice(0, 10),
      }));
      return trashList;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('articles/getTrashedArticles');
  },
};

</script>
