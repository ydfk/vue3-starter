/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-04-10 11:30:52
 * @LastEditors: ydfk
 * @LastEditTime: 2022-10-26 17:42:57
 */
export const VERSION = "%BUILDNUMBER%";
export const TOKEN_REFRESH = 5 * 60;
export const DATE_FORMAT = "YYYY-MM-DD";

export const REGEX_PASSWORD = "^[0-9|a-z|A-Z|!@#$%\\^&*/\\\\_-|.]{6,16}$"; // 密码正则表达式
export const REGEX_NO_SPACE = "^[^\\s]*$"; // 禁止空格
export const REGEX_MOBILE = /^1[3456789]\d{9}$/;
export const REGEX_CHINESE = "[\u4E00-\u9FA5]"; // 中文
