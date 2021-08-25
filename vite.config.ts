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
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve("src") + "/",
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
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
          rewrite: (path) => path.replace("/api/", "/"),
        },
      },
    },
  });
};
