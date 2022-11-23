/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-26 17:27:13
 * @LastEditors: ydfk
 * @LastEditTime: 2022-11-23 14:59:05
 */
import { defineStore } from "pinia";
import { store } from "@/stores";

interface AppState {
  loading: boolean;
}

export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    loading: false,
  }),
  // persist: {
  //   paths: [],
  //   storage: window.sessionStorage,
  // },
});

export const useAppStoreWithOut = () => useAppStore(store);
