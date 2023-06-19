import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import marked from 'marked';
import Vuex from 'vuex';
import note from './README.md';

const mockUpData = {
  namespace: true,
  state: {
    targetArticle: {
      id: null,
      title: '',
      content: '',
    },
    articleList: [
      {
        id: 1,
        title: 'JavaScriptとは',
        content: `
          Front Lessonで学習したHTMLやCSSはページを構成し装飾するための**マークアップ言語**です。  
          これからやってもらうJavaScriptというものは**プログラミング言語**です。

          <img src="https://res.cloudinary.com/gizumo-inc/image/upload/v1542180696/curriculums/Front%20lesson/first-markup/03.jpg">

          プログラミング言語というものは「こうしたら、こう動く」というプログラムを作るための言語になります。

          JavaScriptと**Java**は別物なので、間違えないようにしましょう。


          ## 特徴

          ここではとっつきづらいことを説明しているので、なんとなく理解できれば問題ないです。

          JavaScriptはテキストエディタとブラウザがあれば書いたコードの確認ができます。

          なぜかと言うと、JavaScriptは<span style="color: red; font-weight: bold;">ブラウザ側で動作する言語</span>だからです。ブラウザに実装されているJavaScriptエンジンというもので解釈されます。ただ、ブラウザごとにJavaScriptエンジンが違うので、**違う動きをする**ことがあります。  
          余談ですが、HTML/CSSはブラウザのレンダリングエンジンというもので解釈されます。

          また、書き方がどんどん進化していたり、React・Vueなどのライブラリ・フレームワークがつくられ、一言にJavaScriptと言っても**やってることにはかなりの幅があります**。


          ## よくやること・できること

          JavaScriptでよくやることとして、第一に上がってくるものはやはり<span style="color: red; font-weight: bold;">HTML要素の操作</span>です。

          jQueryのレッスンでもやってもらいますが、作ったページにほぼ際限なく動きをつけることが可能です。  
          例えば下記のようなことです。

          - メニューボタンを押すとスライドして表示されるメニュー
          - 画像が順番に切り替わるスライドショー
          - スクロールすると表示される、上に戻るボタン
          - メニューをクリックするとその場所までスクロールしてくれるもの
          - 選択したボタンの種類に紐づく商品のみの表示

          ただ、このようなHTML操作に焦点が行きがちですが<span style="color: red; font-weight: bold;">それだけではありません</span>。

          それ以外にも、ユーザーが使ってる端末やブラウザの情報を取得して処理を変えることやURLのパラメータによって処理を変えたり、URLを変更して別のページに遷移させることなんかも可能です。  
          JavaScriptに触れたこともないという方は想像ができないかもしれませんが、別のサーバーなどにリクエストを送ってそれに応じて返ってきたデータを表示するといったことも可能です。


          また、前述のReactやVueではそれとは次元が違う使われ方をされています。それについては、jQueryの次のレッスンで軽く触れる予定です。
        `,
      },
    ],
  },
  getters: {
    transformedArticles(state) {
      return state.articleList.map(article => ({
        id: article.id,
        content: `${article.title + article.content}`,
      }));
    },
  },
  mutations: {
    getArticle(state, payload) {
      state.targetArticle = Object.assign(
        state.articleList.find(article => article.id === payload.id),
      );
    }
  },
  actions: {
    getArticle({ commit }, articleId) {
      commit({
        type: 'getArticle',
        id: articleId,
      })
    }
  }
}

storiesOf('MOLECULES|MarkdownView', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      template: `<app-markdown-view
                  :markdown-content="markdownContent"
                >
                </app-markdown-view>`,
      computed: {
        markdownContent() {
          const { title, content } = this.$store.state.articles.targetArticle;;
          return `# ${title}\n${content}`;
        }
      },
      created() {
        this.$store.dispatch('getArticle', parseInt(1, 10));
      },
      store: new Vuex.Store({
        modules: {
          articles: mockUpData,
        }
      })
    }
  }, { notes: note });

storiesOf('MOLECULES|MarkdownView', module)
  .addDecorator(withKnobs)
  .add('whiteBg', () => {
    return {
      template: `<app-markdown-view
                  :markdown-content="markdownContent"
                  whiteBg
                >
                </app-markdown-view>`,
      props: {
        whiteBg: {
          type: Boolean,
          default: true,
        }
      },
      computed: {
        markdownContent() {
          const { title, content } = this.$store.state.articles.targetArticle;
          return `# ${title}\n${content}`;
        }
      },
      created() {
        this.$store.dispatch('getArticle', parseInt(1, 10));
      },
      store: new Vuex.Store({
        modules: {
          articles: mockUpData,
        }
      }),
    }
  }, { notes: note });