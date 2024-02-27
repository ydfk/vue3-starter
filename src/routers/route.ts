/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-26 12:41:57
 * @LastEditors: ydfk
 * @LastEditTime: 2024-02-27 14:04:32
 */

import { RouterEnum } from "@/enums/router";
import { RouteRecordRaw } from "vue-router";

export const menusRoutes: RouteRecordRaw[] = [
  {
    path: `/${RouterEnum.Dashboard}`,
    name: RouterEnum.Dashboard,
    component: () => import("@/views/dashboard/Dashboard.vue"),
  },
];

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Root",
    redirect: RouterEnum.Login,
  },
  {
    path: `/${RouterEnum.Login}`,
    name: RouterEnum.Login,
    meta: { needAuth: false },
    component: () => import("@/views/login/Login.vue"),
  },
  {
    path: `/${RouterEnum.Home}`,
    name: RouterEnum.Home,
    component: () => import("@/views/home/Home.vue"),
    children: menusRoutes,
  },
];
