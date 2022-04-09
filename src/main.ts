/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-24 17:24:45
 * @LastEditors: ydfk
 * @LastEditTime: 2022-04-09 18:35:33
 */
import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./routers";
import { setupStore } from "@/stores/index";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

import "virtual:windi.css";
import "virtual:windi-devtools";

import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";

dayjs.locale("zh-cn");

const bootstrap = () => {
  const app = createApp(App);
  setupRouter(app);
  setupStore(app);

  app.config.globalProperties.$message = message;

  app.mount("#app");
};

bootstrap();
