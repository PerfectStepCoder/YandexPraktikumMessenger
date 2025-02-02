import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: 'src',
  plugins: [
    handlebars({
      partialDirectory: './src/pages/oldTemplates',
    }),
    viteStaticCopy({
        targets: [
          {
            src: '_redirects',
            dest: ''
          },
          {
            src: './pages/oldTemplates/*.hbs',
            dest: 'assets/pages'
          }
        ]
    })
  ],
  server: {
    port: 3000,
  },
  assetsInclude: ['./pages/oldTemplates/*.hbs'],
  build: {
    outDir: '../build',
    rollupOptions: {
      external: ['uuid'], // Указываем, что модуль должен оставаться внешним
    },
  },
})
