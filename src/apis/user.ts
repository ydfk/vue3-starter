/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-04-14 13:35:55
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-04 15:58:43
 */
import type { TokenModel, UserModel } from "@/commons/models/user";
import { doHttp } from "@/utils/http/axios";

export const apiGetCurrentUser = () => doHttp.get<UserModel>({ url: "user/current" });

export const apiGetToken = (userName: string, password: string) =>
  doHttp.post<TokenModel>({ url: "token", data: { userName: userName, password: password } });

export const apiRefreshToken = () => doHttp.get<TokenModel>({ url: "token/refresh" });
