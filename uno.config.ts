/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2024-02-22 11:23:45
 * @LastEditors: ydfk
 * @LastEditTime: 2024-02-27 11:51:52
 */
import { defineConfig, presetTypography, presetUno, presetAttributify } from "unocss";
import presetChinese from "unocss-preset-chinese";
import presetEase from "unocss-preset-ease";

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetChinese(), presetEase(), presetTypography()],
  shortcuts: [
    ["flex-center", "flex items-center justify-center"],
    ["flex-between", "flex items-center justify-between"],
    ["flex-end", "flex items-end justify-between"],
  ],
});
