/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-04-14 13:35:55
 * @LastEditors: ydfk
 * @LastEditTime: 2022-11-23 14:52:43
 */
import type { UserModel } from "@/commons/models/user";
import { doHttp } from "@/utils/http/axios";

export const apiGetCurrentUser = () => doHttp.get<UserModel>({ url: "user/current" });
