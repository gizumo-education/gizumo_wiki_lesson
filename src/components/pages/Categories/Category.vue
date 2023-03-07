<template>
  <div class="category">
    <app-category-post
      class="category-form"
      :access="access"
      :category="categoryName"
      :done-message="completeMessage"
      :error-message="incompleteMessage"
      :disabled="loading"
      @handle-submit="addCategory"
      @update-value="categoryName = $event.target.value"
    />
    <!-- @エミットを受け取る＝行いたい処理 -->
    <app-category-list
      class="category-list"
      :access="access"
      :categories="categories"
      :delete-category-name="deleteCategoryName"
      @open-modal="openModal"
      @handle-click="handleClick"
    />
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  mixins: [Mixins],
  data() {
    return {
      categoryName: '',
      deleteCategoryName: '',
      categoryId: '',
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categoriesList;
    },
    // categories() のような形でcomputedを追加メッセージ
    completeMessage() {
      return this.$store.state.categories.doneMessage;
    },
    // カテゴリーが追加できませんでした、メッセージ
    incompleteMessage() {
      return this.$store.state.categories.errorMessage;
    },
    // loading呼ぶ categories.jsのstateからloadingもってくる
    loading() {
      return this.$store.state.categories.loading;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllLists');
  },
  methods: {
    addCategory() {
      this.$store.dispatch('categories/postCategory', this.categoryName);
      this.categoryName = '';
    },
    // モーダルを開く処理をかくmixinを使う→import Mixins from '@Helpers/mixins';とmixins: [Mixins]
    // pagesのList.vueから処理の中身持ってきた
    openModal(id, name) {
      console.log('モーダル表示した');
      this.toggleModal();
      // CategoryListのopenModal(categoryId, categoryName) {...の部分の
      // categoryNameをnameでとってきて表示させている
      this.deleteCategoryName = name;
      // このidで、削除したいカテゴリーのidをとってきているのでhandleClick()内のcategoryIdにidを代入して
      // handleClick()の処理で取得したIdのカテゴリーを削除できるようにする
      this.categoryId = id;
    },
    // モーダル内の削除ボタンをクリック↓
    handleClick() {
      console.log('モーダル内の削除ボタン押せた');
      console.log(this.categoryId);
      this.toggleModal();
      // 以下APIを実行する処理を記述
      this.$store.dispatch('categories/deleteCategory', this.categoryId);
      
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  display:flex;
}
.category-form {
  flex-basis:30%;
}
.category-list {
  flex-basis:70%;
}
</style>
