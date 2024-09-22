import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: "src/main.ts",
      userscript: {
        icon: "https://cdn.2550505.com/share/legacy-sso/logo-apple-apple-touch-icon-72x72.png",
        name: "毛怪俱乐部显示最新回复时间",
        namespace: "https://github.com/KazooTTT/mgclub-evolve",
        match: ["https://2550505.com/"],
        author: "KazooTTT",
        description: "展示毛怪俱乐部(2550505.com)每个帖子最新的回复时间",
        license: "MIT",
        version: "0.0.4",
      },
    }),
  ],
  build: {
    target: "es2015",
  },
});
