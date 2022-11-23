/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-26 17:19:50
 * @LastEditors: ydfk
 * @LastEditTime: 2022-04-14 12:31:17
 */
import { createPinia } from "pinia";
import { App } from "vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const store = createPinia();
store.use(piniaPluginPersistedstate);

export const setupStore = (app: App<Element>) => {
  app.use(store);
};

export { store };
