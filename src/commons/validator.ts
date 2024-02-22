/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-10-26 20:58:12
 * @LastEditors: ydfk
 * @LastEditTime: 2024-02-22 14:57:08
 */
import { doHttp } from "@/utils/http/axios";
import { REGEX_CHINESE, REGEX_NO_SPACE } from "./const";

function remote(rule, value) {
  return new Promise<void>((resolve, reject) => {
    const url: string = rule.url;
    if (url === undefined || url === null || url.trim() === "") {
      return reject("remote validator url is null");
    }

    if (!value) {
      resolve();
    }

    let message: string = rule.message;
    if (message) {
      message = rule.message;
    } else {
      message = `'${value}'已存在`;
    }

    if (rule.field) {
      rule.data[rule.field] = value;
    }

    // try {
    //   const res = await doHttp.post<boolean>({ url: url, data: rule.data });
    //   if (res) {
    //     resolve();
    //   } else {
    //     reject(message);
    //   }
    // } catch (e) {
    //   reject(e);
    // }

    doHttp
      .post<boolean>({ url: url, data: rule.data })
      .then((res) => {
        if (res) {
          resolve();
        } else {
          reject(message);
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function numberMin(rule, value) {
  return new Promise<void>((resolve, reject) => {
    let message: string = rule.message;

    const min = (rule.data as number) || 0;

    if (message) {
      message = rule.message;
    } else {
      message = `值不能小于${min}`;
    }

    if (value >= min) {
      resolve();
    } else {
      reject(message);
    }
  });
}

export function getMaxLengthRule(maxLength: number, msg?: string) {
  return { max: maxLength, message: msg || `长度不能超过${maxLength}位` };
}

export function getRequireRule(msg: string) {
  return { required: true, message: msg };
}

export function getNumberMinRule(min: number, msg?: string) {
  return { validator: numberMin, data: min, message: msg || `值不能小于${min}` };
}

export function getRemoteRule(url: string, data: any, msg?: string) {
  return { validator: remote, url: url, data: data, message: msg, trigger: "blur" };
}
