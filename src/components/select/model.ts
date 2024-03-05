/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2023-01-01 13:50:06
 * @LastEditors: ydfk
 * @LastEditTime: 2023-05-20 14:48:24
 */
export interface SelectOptionModel {
  label: string;
  value: string;
  pinyin?: string;
  fullPinyin?: string;
}

export interface CascaderOptionModel {
  label: string;
  value: string;
  pinyin?: string;
  fullPinyin?: string;
  children: CascaderOptionModel[];
}
