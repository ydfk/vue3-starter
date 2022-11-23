/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-04-11 15:32:20
 * @LastEditors: ydfk
 * @LastEditTime: 2022-04-11 15:33:11
 */
import * as Icons from "@ant-design/icons-vue";
import type { App, Plugin } from "vue";
import type { IconType } from "@ant-design/icons-vue/es/components/Icon";

type AllIcon = {
  [key: string]: IconType;
};

export const AntDesignIcon: Plugin = {
  install(app: App) {
    const allIcon: AllIcon = Icons as any;
    Object.keys(Icons)
      .filter((k) => !["default", "createFromIconfontCN", "getTwoToneColor", "setTwoToneColor"].includes(k))
      .forEach((k) => {
        app.component(allIcon[k].displayName, allIcon[k]);
      });
  },
};
