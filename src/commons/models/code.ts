/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-04-20 16:52:02
 * @LastEditors: ydfk
 * @LastEditTime: 2022-11-23 14:53:45
 */

import { BaseModel } from "./base";

export interface ItemSourceModel {
  value: string;
  text: string;
}

export interface CodeModel extends BaseModel {
  parentId?: string;
  codeTypeId: string;
  name: string;
  description?: string;
  OrderIndex: number;
}
