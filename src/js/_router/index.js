import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';

import Signin from '@Pages/Signin/index.vue';
import Signout from '@Pages/Signout/index.vue';
import NotFound from '@Pages/NotFound/index.vue';
import Home from '@Pages/Home/index.vue';

// カテゴリー
import Categories from '@Pages/Categories/index.vue';
import CategoryList from '@Pages/Categories/List.vue';
import CategoryEdit from '@Pages/Categories/Edit.vue';

// 記事
import Articles from '@Pages/Articles/index.vue';
import ArticleList from '@Pages/Articles/List.vue';
import ArticleDetail from '@Pages/Articles/Detail.vue';
import ArticleEdit from '@Pages/Articles/Edit.vue';
import ArticlePost from '@Pages/Articles/Post.vue';

// 自分のアカウントページ
import Profile from '@Pages/Profile/index.vue';

// ユーザー
import Users from '@Pages/Users/index.vue';
import UserList from '@Pages/Users/List.vue';
import UserDetail from '@Pages/Users/Detail.vue';
import UserCreate from '@Pages/Users/Create.vue';

// パスワード
import PasswordInit from '@Pages/Password/init.vue';
import PasswordUpdate from '@Pages/Password/update.vue';

import Store from '../_store';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'signin',
      path: '/signin',
      component: Signin,
      meta: {
        isPublic: true,
      },
    },
    {
      name: 'signout',
      path: '/signout',
      component: Signout,
      props: true,
    },
    {
      name: 'home',
      path: '/',
      component: Home,
    },
    {
      name: 'passwordInit',
      path: '/password/init',
      component: PasswordInit,
    },
    {
      name: 'passwordUpdate',
      path: '/password/update',
      component: PasswordUpdate,
    },
    {
      name: 'profile',
      path: '/profile',
      component: Profile,
    },
    {
      path: '/categories',
      component: Categories,
      children: [
        {
          name: 'categoryList',
          path: '',
          component: CategoryList,
        },
        {
          name: 'categoryEdit',
          path: ':id',
          component: CategoryEdit,
        },
      ],
    },
    {
      path: '/articles',
      component: Articles,
      children: [
        {
          name: 'articleList',
          path: '',
          component: ArticleList,
          beforeEnter(to, from, next) {
            /**
             * 記事作成、記事更新、記事削除からリダイレクトするときは?redirect=リダイレクト元のurlのパラメータを
             * 渡してリダイレクト、パラメータが存在する場合はclearMessageアクションを通知しない
             */
            const isArticle = from.name ? from.name.indexOf('article') >= 0 : false;
            const isRedirect = to.query.redirect;
            if (isArticle && isRedirect) {
              next();
            } else {
              Store.dispatch('articles/clearMessage');
              next();
            }
          },
        },
        {
          name: 'articlePost',
          path: 'post',
          component: ArticlePost,
        },
        {
          name: 'articleDetail',
          path: ':id',
          component: ArticleDetail,
        },
        {
          name: 'articleEdit',
          path: ':id/edit',
          component: ArticleEdit,
        },
      ],
    },
    {
      path: '/users',
      component: Users,
      children: [
        {
          name: 'allUsers',
          path: '',
          component: UserList,
        },
        {
          name: 'userCreate',
          path: 'create',
          component: UserCreate,
        },
        {
          name: 'userDetail',
          path: ':id',
          component: UserDetail,
        },
      ],
    },
    {
      name: 'notfound',
      path: '/*',
      component: NotFound,
      meta: {
        isPublic: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = Cookies.get('user-token') || null;
  const isPublic = to.matched.some(page => page.meta.isPublic);
  const isSignIn = to.matched.some(page => page.path === '/signin');
  const isPasswordInit = to.matched.some(page => page.path === '/password/init');
  const isSignout = to.matched.some(page => page.path === '/signout');
  const notFromSignout = from.matched.some(page => page.path !== '/signout');

  if (!isPublic && !Store.state.auth.signedIn) {
    /**
     * 認証が必要なurlは、checkAuthアクションを実行して
     * cookieにセットされているtokenの整合性をチェック、整合性がとれていない場合もしくは
     * checkAuthアクションでエラーが発生した場合は
     * 「/signin」にリダイレクト
     * 整合性がとれた場合
     * パスワード初期化が済んでいればアクセスしようとしたURLにリダイレクト
     * 済んでなければ「/password/init」にリダイレクト
     */
    Store.dispatch('auth/checkAuth', { token })
      .then(() => {
        if (Store.state.auth.user.password_reset_flg) {
          return next();
        }
        return next('/password/init');
      })
      .catch(() => {
        const query = to.fullPath === '/signout'
        || to.fullPath === '/password/init'
          ? {}
          : { redirect: to.fullPath };
        return next({ path: '/signin', query });
      });
  } else if (isSignIn) {
    /**
     * 「/signin」ページにアクセスしたときにcheckAuthアクションを実行して
     * cookieにセットされているtokenの整合性が取れて
     * パスワード初期化が済んでいれば
     * 「/」にリダイレクト
     * 済んでなければ「/password/init」にリダイレクト
     */
    Store.dispatch('auth/checkAuth', { token })
      .then(() => {
        if (Store.state.auth.user.password_reset_flg) return next('/');
        return next('/password/init');
      }).catch(() => next());
  } else if (!token && notFromSignout && !isSignout) {
    next('/signout');
  } else if (!Store.state.auth.user.password_reset_flg && !isPasswordInit) {
    /**
     *  Store.state.auth.user.password_reset_flgが0
     *  /password/initへじゃない
     */
    next('/password/init');
  } else {
    next();
  }
});

export default router;
