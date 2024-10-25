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
          }
        ]
    })
  ],
  server: {
    port: 3000,
  },
  assetsInclude: ['**/*.hbs'],
  build: {
    outDir: '../build',
  },
})
