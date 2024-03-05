/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-26 23:04:48
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-05 11:09:15
 */

import { TokenModel } from "@/commons/models/user";
import { doHttp } from "@/utils/http/axios";

export const loginApi = (userName: string, password: string) =>
  doHttp.post<TokenModel>({ url: "login", data: { userName: userName, password: password } });

export const apiRefreshToken = () => doHttp.get<TokenModel>({ url: "token/refresh" });
