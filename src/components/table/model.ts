/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-10-27 14:23:41
 * @LastEditors: ydfk
 * @LastEditTime: 2022-10-27 15:58:22
 */
import { TableActionKeyEnum } from "./enum";
import type { TableColumnType } from "ant-design-vue";

export interface TableColumn extends TableColumnType {
  title: string;
  dataIndex: string;
}

export interface TableAction {
  key: TableActionKeyEnum; // 操作唯一确定key
  title: string; // 操作名称
}
