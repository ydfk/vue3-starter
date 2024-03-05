/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-04-14 11:23:13
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-04 15:26:28
 */

export interface BaseModel {
  id: string;
  updateAt?: Date | any;
  createAt?: Date | any;
  updateBy?: string;
  createBy?: string;
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

export interface PageQuery<T> extends PageQueryModel {
  sortField: string;
  sortOrder: string;
  param: T;
  keyword: string;
}

export interface ProjectQueryType {
  queryType: number;
}

export interface PageResult<T> {
  result: T[];
  total: number;
  totalPages: number;
}
