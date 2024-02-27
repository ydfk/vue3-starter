/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-04-14 11:25:02
 * @LastEditors: ydfk
 * @LastEditTime: 2024-02-27 09:21:12
 */

import { BaseModel } from "./base";

export interface UserModel extends BaseModel {
  id: string;
  name: string;
}

export interface TokenModel {
  token: string;
  expireDate: Date;
}
