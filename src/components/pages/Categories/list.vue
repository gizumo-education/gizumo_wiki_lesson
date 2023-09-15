<template>
  <div class="category">
    <app-category-post
      class="category__post"
      :category="category"
      :access="access"
      :disabled="loading"
      :done-message="doneMessage"
      :error-message="errorMessage"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      class="category__list"
      :categories="categoriesList"
      :theads="theads"
      :access="access"
    />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  mixins: [Mixins], // ここで定義したメソッドを使えるようにしている
  data() {
    return {
      theads: ['カテゴリー名'],
      category: '',
    };
  },
  computed: {
    categoriesList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    deleteCategoryName() {
      // ここで削除するカテゴリー名を取得する
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    updateValue($event) {
      this.category = $event.target.value;
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategory', this.category);
      this.category = '';
    },
    openModal() {
      // モーダルを開く処理
      // ①カテゴリー削除モーダルを開く
      // ②削除するカテゴリー名とカテゴリーIDをstateに保存する
    },
    handleClick() {
      // モーダル内の削除ボタンを押した時の処理
      // ①カテゴリー削除APIを叩く
      // ②カテゴリー削除モーダルを閉じる
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  &__post {
    float: left;
    width: 35%;
    padding-right: 20px;
  }
  &__list {
    border-left: 1px solid #e0e0e0;
    padding-left: 19px;
    overflow: hidden;
  }
}
</style>
