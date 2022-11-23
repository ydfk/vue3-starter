/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-04-14 11:23:13
 * @LastEditors: ydfk
 * @LastEditTime: 2022-11-23 14:53:33
 */
import type { Dayjs } from "dayjs";

export interface BaseModel {
  id: string;
  updateAt?: Date | any;
  createAt?: Date | any;
  [key: string]: any;
}

export interface PagedResult<T> {
  totalCount: number;
  data: T[];
  totalPage: number;
  pageIndex: number;
}

export interface PageQueryModel {
  pageSize: number;
  pageIndex: number;
  searchText: string;
}
