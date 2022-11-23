/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-10-21 10:58:09
 * @LastEditors: ydfk
 * @LastEditTime: 2022-10-21 15:34:59
 */
import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    // 标题
    title?: string;
    // 是否需要授权才能访问
    needAuth?: boolean;
    // 是否显示侧边栏
    showSider?: boolean;
    // 图标
    icon?: string;
  }
}
