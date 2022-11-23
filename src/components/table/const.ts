/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-10-27 15:15:25
 * @LastEditors: ydfk
 * @LastEditTime: 2022-10-27 17:14:44
 */

import { TableActionKeyEnum } from "./enum";
import type { TableAction } from "./model";

export const TABLE_ACTION_EDIT: TableAction = {
  key: TableActionKeyEnum.EDIT,
  title: "编辑",
};

export const TABLE_ACTION_DETAIL: TableAction = {
  key: TableActionKeyEnum.DETAIL,
  title: "详情",
};

export const TABLE_ACTION_DELETE: TableAction = {
  key: TableActionKeyEnum.DELETE,
  title: "删除",
};
