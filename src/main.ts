/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-24 17:24:45
 * @LastEditors: ydfk
 * @LastEditTime: 2021-08-26 12:39:35
 */
import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./routers";

const bootstrap = () => {
  const app = createApp(App);
  setupRouter(app);
  app.mount("#app");
};

bootstrap();
