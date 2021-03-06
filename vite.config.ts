/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-24 17:24:45
 * @LastEditors: ydfk
 * @LastEditTime: 2022-04-09 18:11:47
 */
import { ConfigEnv, defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";
import { viteMockServe } from "vite-plugin-mock";
import WindiCSS from "vite-plugin-windicss";
import pkg from "./package.json";
import dayjs from "dayjs";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), ".", dir);
};

export default ({ mode, command }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  const isBuild = command === "build";

  const mockPlugin =
    env.VITE_USE_MOCK &&
    viteMockServe({
      ignore: /^\_/,
      mockPath: "mock",
      localEnabled: command === "serve",
      prodEnabled: command !== "serve" && isBuild,
      injectCode: `
        import { setupProdMockServer } from '../mock/_createProductionServer';
        setupProdMockServer();
      `,
    });

  return defineConfig({
    plugins: [
      vue({ reactivityTransform: false }),
      vueJsx(),
      WindiCSS(),
      mockPlugin,
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: "less",
          }),
        ],
      }),
      AutoImport({
        imports: ["vue"],
      }),
    ],
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: pathResolve("src") + "/",
        },
        {
          find: /#\//,
          replacement: pathResolve("types") + "/",
        },
      ],
    },
    base: "./",
    server: {
      port: Number(env.VITE_PORT), // ???????????????????????????
      open: true, // ????????????????????????????????????????????????
      cors: true, // ????????????

      // ???????????????????????????????????????????????????
      proxy: {
        "/api": {
          target: env.VITE_PROXY_HOST,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/var.scss";`,
        },
        less: {
          modifyVars: {
            //"primary-color": "#fff",
          },
          javascriptEnabled: true,
        },
      },
    },

    build: {
      // target: ["esnext"],
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true,
      //   },
      // },
    },

    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  });
};
