/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-26 22:55:36
 * @LastEditors: ydfk
 * @LastEditTime: 2022-09-08 14:28:24
 */

import { isObject } from "./is";
import type { CascaderProps } from "ant-design-vue";

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = "";
  for (const key in obj) {
    parameters += key + "=" + encodeURIComponent(obj[key]) + "&";
  }
  parameters = parameters.replace(/&$/, "");
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, "?") + parameters;
}

/**
 * 深拷贝
 * @param src 来源
 * @param target 目标
 * @returns 来源
 */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

/**
 * 使用blob导出文件
 * @param res axios返回的 response 应为ArrayBuffer
 * @param fileName 文件名称
 */
export const exportFile = (res: any, fileName: string) => {
  const blob = new Blob([res], { type: res.type });
  //@ts-ignore
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //@ts-ignore
    window.navigator.msSaveOrOpenBlob(res, fileName);
  } else {
    const downloadElement = document.createElement("a");
    const href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = fileName; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放blob对象
  }
};

/**
 * 下拉选择框的筛选
 * @param input 输入的值
 * @param option 选项
 * @returns 筛选后的结果
 */
export const selectFilterOption = (input: string, option: any) => {
  return (
    option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
    (option.pinYin && option.pinYin.toLowerCase().indexOf(input.toLowerCase()) >= 0) ||
    (option.fullPinYin && option.fullPinYin.toLowerCase().indexOf(input.toLowerCase()) >= 0)
  );
};

/**
 * 返回一个包含年与月的级联选择框的options
 * @param start 开始年
 * @param end 结束年份
 * @returns 返回一个包含年与月的级联选择框的options
 */
export const getYearCascaderOptions = (start: number, end: number): CascaderProps["options"] => {
  const options: CascaderProps["options"] = [];
  while (start <= end) {
    options.push({
      value: `${start}`,
      label: `${start}年`,
      children: getMonthCascaderOptions(start),
    });
    start++;
  }

  return options;
};

const getMonthCascaderOptions = (year: number) => {
  const options: CascaderProps["options"] = [];
  for (let j = 1; j <= 12; j++) {
    options.push({
      value: `${year}-${j}`,
      label: `${j}月`,
      year: year,
      month: j,
    });
  }

  return options;
};

export const iframeReady = () => {
  window.parent.postMessage(
    {
      type: "IFRAME_STATUS",
      data: "READY",
    },
    "*"
  );
};
