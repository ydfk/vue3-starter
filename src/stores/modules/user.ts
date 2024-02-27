/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-04-14 11:10:40
 * @LastEditors: ydfk
 * @LastEditTime: 2024-02-27 11:58:52
 */
import { apiGetCurrentUser } from "@/apis/user";
import { TOKEN_REFRESH } from "@/commons/const";
import { UserModel } from "@/commons/models/user";
import dayjs from "dayjs";
import { defineStore } from "pinia";
import { store } from "@/stores";
import { loginApi } from "@/apis/login";

interface UserState {
  user: UserModel;
  token: string;
  tokenExpire: string;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    user: {} as UserModel,
    token: "",
    tokenExpire: "",
  }),
  actions: {
    async login(username: string, password: string) {
      const token = await loginApi(username, password);
      if (token && token.token) {
        this.token = token.token;
        this.tokenExpire = dayjs(token.expireDate).format("YYYY-MM-DD HH:mm:ss");
        await this.setUser();
        return true;
      } else {
        this.clearUser();
        return false;
      }
    },
    async setUser() {
      this.user = await apiGetCurrentUser();
    },
    clearUser() {
      this.user = {} as UserModel;
      this.token = "";
      this.tokenExpire = "";
    },
    checkToken() {
      return new Promise<string>((resolve, reject) => {
        if (!this.token) {
          reject();
        } else {
          resolve(this.token);
        }
      });
    },
  },
  persist: {
    storage: window.sessionStorage,
  },
});

export const useUserStoreWithOut = () => useUserStore(store);
