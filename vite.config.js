import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  root: "src",
  plugins: [
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: "_redirects",
    //       dest: "",
    //     },
    //   ],
    // }),
  ],
  server: {
    port: 3000,
  },
  build: {
    outDir: "../build",
    // rollupOptions: {
    //   external: ["uuid"], // Указываем, что модуль должен оставаться внешним
    // },
  },
});
