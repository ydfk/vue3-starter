/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-04-10 11:30:52
 * @LastEditors: ydfk
 * @LastEditTime: 2024-02-27 14:08:51
 */
export const SYSTEM_NAME = import.meta.env.VITE_GLOB_APP_TITLE || "vue-starter";
export const VERSION = "%BUILDNUMBER%";
export const TOKEN_REFRESH = 5 * 60; // token刷新时间

export const DATE_FORMAT = "YYYY/MM/DD";
export const DATE_FORMAT_HAS_TIME = "YYYY/MM/DD HH:mm:ss";
export const DATE_FORMAT_NO_SECOND = "YYYY/MM/DD HH:mm";
export const DATE_FORMAT_NO_TIME_ZH = "YYYY年MM月DD日";
export const DATE_FORMAT_NO_SECOND_ZH = "YYYY年MM月DD日 HH:mm";
export const DATE_FORMAT_ONLY_TIME = "HH:mm:ss";
export const DATE_FORMAT_TRANSMISSION = "YYYY-MM-DDTHH:mm:ss.SSSZ";
export const DATE_FORMAT_HAS_TIME_NEW = "YYYY-MM-DD HH:mm:ss";

export const NUMBER_FORMAT_N2 = "0,0.00";
export const NUMBER_FORMAT_N = "0,0";
export const INPUT_NUMBER_MAX = 9999999999999; //数字框最大值
export const INPUT_NUMBER_MIN = -9999999999999; // 数字框最小值
export const INPUT_NUMBER_STEP = 0.01; // 步进

export const REGEX_PASSWORD = "^[0-9|a-z|A-Z|!@#$%\\^&*/\\\\_-|.]{6,16}$"; // 密码正则表达式
export const REGEX_NO_SPACE = "^[^\\s]*$"; // 禁止空格
export const REGEX_MOBILE = /^1[3456789]\d{9}$/;
export const REGEX_CHINESE = "[\u4E00-\u9FA5]"; // 中文
export const REGEX_FILE_NAME = /^(?![\s.])[^\\/:*?"<>|]*$/; // 文件名
