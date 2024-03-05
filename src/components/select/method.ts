/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2023-01-01 13:47:31
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-04 15:21:49
 */

import type { CodeModel } from "@/commons/models/code";
import type { SelectOptionModel, CascaderOptionModel } from "./model";

export const convertCodeToSelectOption = (code: CodeModel[]): SelectOptionModel[] => {
  return code.map((x) => {
    return {
      value: x.id,
      label: x.name,
      pinyin: x.pinyin,
      fullPinyin: x.fullPinyin,
    };
  });
};

export const getCascaderPath = (id: string, options: CascaderOptionModel[]): string[] => {
  let path: string[] = [];

  for (const option of options) {
    if (path.length == 0) {
      if (option.children && option.children.length > 0) {
        const childrenPath = getCascaderPath(id, option.children);
        if (childrenPath.length > 0) {
          path = [option.value, ...childrenPath];
        }
      } else {
        if (option.value == id) {
          path = [option.value];
        }
      }
    }
  }

  return path;
};

export const getCascaderSearch = () => {
  return {
    filter: (inputValue: string, path: CascaderOptionModel[]) => {
      let inFilter = false;
      if (inputValue && path && path.length > 0) {
        for (const p of path) {
          if (!inFilter) {
            if (
              p.label.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 ||
              (p.pinyin && p.pinyin.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0) ||
              (p.fullPinyin && p.fullPinyin.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0)
            ) {
              inFilter = true;
            }
          }
        }
      }

      return inFilter;
    },
    limit: 50,
  };
};

export const getCascaderOptionModel = (id: string, options?: CascaderOptionModel[]): CascaderOptionModel | null => {
  if (options && options.length > 0) {
    for (const option of options) {
      if (option.value == id) {
        return option;
      } else if (option.children && option.children.length > 0) {
        return getCascaderOptionModel(id, option.children);
      }
    }
  }

  return null;
};
