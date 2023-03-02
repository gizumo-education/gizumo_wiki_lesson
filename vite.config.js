import { defineConfig, loadEnv } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import legacy from '@vitejs/plugin-legacy';
import checker from 'vite-plugin-checker';

export default (({ mode }) => {
  const rootDirPath = process.cwd();
  const env = loadEnv(mode, `${rootDirPath}/env`, '');

  return defineConfig({
    root: 'src',
    build: {
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [
      createVuePlugin(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
      checker({
        eslint: {
          lintCommand: `eslint "${rootDirPath}/src/{js,components}/**/*.{js,vue}"`,
        },
      }),
    ],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@Components': `${__dirname}/src/components`,
        '@Helpers': `${__dirname}/src/js/_helpers`,
        '@Pages': `${__dirname}/src/components/pages`,
        '@Styles': `${__dirname}/src/styles`,
      },
    },
    css: {
      postcss: {
        plugins: [
          require('autoprefixer'),
        ],
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@use '@Styles/scss/_utils/_utils.scss' as *;`,
        },
      },
    },
    server: {
      open: true,
      port: 8000,
    },
    define: {
      API_BASE_URL: JSON.stringify(env.API_BASE_URL),
      MY_SESSION_STORAGE_KEY: JSON.stringify(env.MY_SESSION_STORAGE_KEY),
    },
  });
});
