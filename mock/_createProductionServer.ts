/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-09-16 21:00:09
 * @LastEditors: ydfk
 * @LastEditTime: 2024-02-22 15:10:18
 */
import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

const modules = import.meta.glob("./**/*.ts", { eager: true });

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes("/_")) {
    return;
  }
  mockModules.push(...(modules as Recordable)[key].default);
});

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
