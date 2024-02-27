/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-26 22:12:40
 * @LastEditors: ydfk
 * @LastEditTime: 2024-02-26 15:56:43
 */

/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = 0,
  ERROR = -1,
  TIMEOUT = 401,
  TYPE = "success",
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

/**
 * @description:  contentTyp
 */
export enum ContentTypeEnum {
  // json
  JSON = "application/json;charset=UTF-8",
  // form-data qs
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data  upload
  FORM_DATA = "multipart/form-data;charset=UTF-8",
}
