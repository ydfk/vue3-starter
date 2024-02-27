/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-26 12:30:11
 * @LastEditors: ydfk
 * @LastEditTime: 2024-02-27 14:03:24
 */

import { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./route";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useUserStoreWithOut } from "@/stores/modules/user";
import { RouterEnum } from "@/enums/router";

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export const goToLogin = () => {
  router.replace({ name: RouterEnum.Login });
};

router.beforeEach((to, _, next) => {
  // 处理meta
  if (to.meta && to.meta.title) {
    document.title = String(to.meta.title);
  }

  if (!to.meta || Object.keys(to.meta).length === 0 || (to.meta && to.meta.needAuth != false)) {
    useUserStoreWithOut()
      .checkToken()
      .then(() => next())
      .catch(() => {
        next({ name: RouterEnum.Login, params: { redirect: to.fullPath } });
      });
  } else {
    next();
  }

  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export const setupRouter = (app: App<Element>) => {
  app.use(router);
};
