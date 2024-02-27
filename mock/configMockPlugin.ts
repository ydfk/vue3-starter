/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2024-02-22 15:11:23
 * @LastEditors: ydfk
 * @LastEditTime: 2024-02-27 11:32:46
 */
import { viteMockServe } from "vite-plugin-mock";

export function configMockPlugin(enable: boolean) {
  return viteMockServe({
    ignore: /^_/,
    mockPath: "mock",
    enable: enable,
    logger: true,
  });
}
