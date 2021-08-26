/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-24 17:24:45
 * @LastEditors: ydfk
 * @LastEditTime: 2021-08-26 13:36:56
 */
import { ConfigEnv, defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), ".", dir);
};

export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: pathResolve("src") + "/",
        },
      ],
    },
    base: "./",
    server: {
      port: Number(env.VITE_PORT), // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域

      // 设置代理，根据我们项目实际情况配置
      proxy: {
        "/api": {
          target: env.VITE_PROXY_HOST,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace("/api/", "/"),
        },
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/var.scss";@import "./src/styles/global.scss";@import "./src/styles/mixins.scss";`,
        },
      },
    },

    build: {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  });
};
