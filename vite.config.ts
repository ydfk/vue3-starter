/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-24 17:24:45
 * @LastEditors: ydfk
 * @LastEditTime: 2024-02-27 11:44:11
 */
import { ConfigEnv, PluginOption, defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";
import pkg from "./package.json";
import dayjs from "dayjs";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import type { Drop } from "esbuild";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons2";
import UnoCSS from "unocss/vite";
import { configMockPlugin } from "./mock/configMockPlugin";

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), ".", dir);
};

const esBuildDrop = (env: Record<string, string>): Drop[] => {
  if (env.VITE_DROP_DEBUGGER && env.VITE_DROP_DEBUGGER == "true" && env.VITE_DROP_CONSOLE && env.VITE_DROP_CONSOLE == "true") {
    return ["console", "debugger"];
  } else if (env.VITE_DROP_DEBUGGER && env.VITE_DROP_DEBUGGER == "true") {
    return ["debugger"];
  } else if (env.VITE_DROP_CONSOLE && env.VITE_DROP_CONSOLE == "true") {
    return ["console"];
  }

  return [];
};

export default ({ mode, command }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  const isBuild = command === "build";

  const plugins: PluginOption[] = [
    Components({
      dirs: ["src/components", "src/componentsBusiness"],
      deep: true,
    }),
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core"],
    }),
    viteCompression(),
    //splitVendorChunkPlugin(),
    // 注册所有的svg文件生成svg雪碧图
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/images/svg")], // icon存放的目录
      symbolId: "icon-[name]", // symbol的id
      inject: "body-last", // 插入的位置
      customDomId: "__svg__icons__dom__", // svg的id
    }),
  ];

  if (env.VITE_USE_MOCK && env.VITE_USE_MOCK === "true") {
    plugins.push(configMockPlugin(true));
  }

  if (env.VITE_ENABLE_ANALYZE && env.VITE_ENABLE_ANALYZE === "true") {
    plugins.push(
      visualizer({
        filename: "./node_modules/.cache/visualizer/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    );
  }
  const timestamp = new Date().getTime();

  return defineConfig({
    plugins: [vue(), vueJsx(), UnoCSS(), ...plugins],
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
      port: Number(env.VITE_PORT), // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域

      // 设置代理，根据我们项目实际情况配置
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
          javascriptEnabled: true,
        },
      },
    },
    esbuild: {
      drop: esBuildDrop(env),
    },
    build: {
      // target: "ESNext",
      // cssTarget: "chrome80",
      rollupOptions: {
        output: {
          // 入口文件名
          entryFileNames: `assets/entry/[name]-[hash]-${timestamp}.js`,
          manualChunks: {
            vue: ["vue", "pinia", "vue-router", "@vueuse/core"],
            antd: ["ant-design-vue", "@ant-design/icons-vue", "dayjs"],
          },
        },
      },
    },

    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },

    optimizeDeps: {
      include: ["ant-design-vue/es/locale/zh_CN", "@ant-design/icons-vue", "dayjs/esm/locale/zh-cn"],
    },
  });
};
