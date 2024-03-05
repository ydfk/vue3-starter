/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-10-27 15:15:25
 * @LastEditors: zhaozijun zaozijun@foxmail.com
 * @LastEditTime: 2023-11-29 15:02:10
 */

import { TableActionKeyEnum } from "./enum";
import type { TableAction } from "./model";
import selectFileIcon from "@/assets/images/file-selected.png";
import unselectFileIcon from "@/assets/images/file-unselected.png";

export const TABLE_ACTION_EDIT: Omit<TableAction, "show" | "disabled"> = {
  key: TableActionKeyEnum.EDIT,
  title: "编辑",
};

export const TABLE_ACTION_DETAIL: Omit<TableAction, "show" | "disabled"> = {
  key: TableActionKeyEnum.DETAIL,
  title: "详情",
};

export const TABLE_ACTION_DELETE: Omit<TableAction, "show" | "disabled"> = {
  key: TableActionKeyEnum.DELETE,
  title: "删除",
};

export const TABLE_ACTION_RESET_PASSWORD: Omit<TableAction, "show" | "disabled"> = {
  key: TableActionKeyEnum.RESET_PASSWORD,
  title: "重置密码",
};

export const TABLE_ACTION_DISABLE: Omit<TableAction, "show" | "disabled"> = {
  key: TableActionKeyEnum.DISABLE,
  title: "禁用",
};

export const TABLE_ACTION_ENABLE: Omit<TableAction, "show" | "disabled"> = {
  key: TableActionKeyEnum.ENABLE,
  title: "启用",
};

export const TABLE_ACTION_REMOVE: Omit<TableAction, "show" | "disabled"> = {
  key: TableActionKeyEnum.REMOVE,
  title: "移除",
};

export const TABLE_ACTION_DOWNLOAD: Omit<TableAction, "show" | "disabled"> = {
  key: TableActionKeyEnum.DOWNLOAD,
  title: "下载",
};

export const TABLE_ACTION_SELECT: Omit<TableAction, "show" | "disabled"> = {
  key: TableActionKeyEnum.SELECT,
  image: unselectFileIcon,
  title: "选取",
};

export const TABLE_ACTION_SELECTED: Omit<TableAction, "show" | "disabled"> = {
  key: TableActionKeyEnum.SELECTED,
  image: selectFileIcon,
  title: "已选",
};
