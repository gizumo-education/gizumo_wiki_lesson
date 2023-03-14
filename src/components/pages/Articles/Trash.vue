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
      const trashList = [];
      list.forEach(item => {
        let title = '';
        if (item.title.length > 30) {
          title = `${item.title.slice(0, 30)}...`;
        } else {
          title = item.title;
        }
        let content = '';
        if (item.content.length > 30) {
          content = `${item.content.slice(0, 30)}...`;
        } else {
          content = item.content;
        }
        const date = item.created_at.slice(0, 10);
        const newList = {
          title,
          content,
          created_at: date,
        };
        trashList.push(newList);
      });
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
