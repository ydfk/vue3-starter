/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-04-14 11:10:40
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-05 15:33:45
 */
import { apiGetCurrentUser, apiGetToken, apiRefreshToken } from "@/apis/user";
import { TOKEN_REFRESH } from "@/commons/const";
import { UserModel } from "@/commons/models/user";
import dayjs from "dayjs";
import { defineStore } from "pinia";
import { store } from "@/stores";

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
      const token = await apiGetToken(username, password);
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
          console.error("token不存在");
          reject();
        } else {
          const expireDate = dayjs(this.tokenExpire);
          const curTime = dayjs();
          if (curTime.isAfter(expireDate)) {
            console.error("token已经过期");
            reject();
          } else {
            const refreshDate = dayjs(expireDate).subtract(TOKEN_REFRESH, "second");

            if (refreshDate.isSameOrBefore(curTime)) {
              console.log("刷新token");
              apiRefreshToken()
                .then((token) => {
                  this.token = token.token;
                  this.tokenExpire = dayjs(token.expireDate).format("YYYY-MM-DD HH:mm:ss");
                  resolve(this.token);
                })
                .catch(() => {
                  reject();
                });
            }

            resolve(this.token);
          }
        }
      });
    },
  },
  persist: {
    storage: window.sessionStorage,
  },
});

export const useUserStoreWithOut = () => useUserStore(store);
