import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  root: 'src',
  plugins: [
    handlebars({
      partialDirectory: './src/pages',
    }),
  ],
  server: {
    port: 3000,
  },
  assetsInclude: ['**/*.hbs'],
  build: {
    outDir: '../build',
  },
})
