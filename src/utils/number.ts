/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-07-07 11:31:22
 * @LastEditors: ydfk
 * @LastEditTime: 2022-08-17 14:31:27
 */

/**
 * 对数字进行千分位分割
 * @param num 数字
 * @param n 小数位数
 * @param symbol 分割符号
 * @returns 千分位后的字符串
 */
export const toThousands = (num: number, n = 2, symbol = ","): string => {
  if (num != undefined) {
    if (n < 0) {
      throw new Error("参数n不应该小于0");
    }

    const hasDot = `${num}`.indexOf(".") != -1; //这里检测num是否为小数，true表示小数
    const m = n != undefined ? n : 1;

    let result = m == 0 ? num.toFixed(m) + "." : hasDot ? (n ? num.toFixed(n) : num) : num.toFixed(m);

    result = result.toString().replace(/(\d)(?=(\d{3})+\.)/g, function (match, p1) {
      return p1 + symbol;
    });

    if (n == 0 || !hasDot) {
      //如果n为0或者传入的num是整数并且没有指定整数的保留位数，则去掉前面操作中的小数位
      result = result.substring(0, result.indexOf("."));
    }

    return result;
  } else {
    return "";
  }
};
