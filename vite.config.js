import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: 'src',
  plugins: [
    handlebars({
      partialDirectory: './src/pages',
    }),
    viteStaticCopy({
        targets: [
          {
            src: '_redirects',
            dest: ''
          },
          {
            src: './pages/*.hbs',
            dest: 'assets/pages'
          }
        ]
    })
  ],
  server: {
    port: 3000,
  },
  assetsInclude: ['./pages/*.hbs'],
  build: {
    outDir: '../build',
  },
})
