/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-10-27 14:23:41
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-04 15:26:10
 */
import { TableActionKeyEnum } from "./enum";
import type { TableColumnType } from "ant-design-vue";

export interface TableColumn extends TableColumnType {
  title: string;
  dataIndex: string;
  width?: number | string;
}

export interface TableAction {
  key: TableActionKeyEnum; // 操作唯一确定key
  title: string; // 操作名称
  image?: string; // 图标路径
  show: (row: any) => boolean; // 控制显隐
  disabled: (row: any) => boolean; // 控制禁用
}
