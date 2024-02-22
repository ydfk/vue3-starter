/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2024-02-22 15:11:23
 * @LastEditors: ydfk
 * @LastEditTime: 2024-02-22 15:19:27
 */
import { viteMockServe } from "vite-plugin-mock";

export function configMockPlugin({ isBuild }: { isBuild: boolean }) {
  return viteMockServe({
    ignore: /^_/,
    mockPath: "mock",
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';

      setupProdMockServer();
      `,
  });
}
