/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-26 12:30:11
 * @LastEditors: ydfk
 * @LastEditTime: 2022-04-09 18:33:16
 */

import { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./route";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  // 处理meta
  if (to.meta && to.meta.title) {
    document.title = String(to.meta.title);
  }
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export const setupRouter = (app: App<Element>) => {
  app.use(router);
};
