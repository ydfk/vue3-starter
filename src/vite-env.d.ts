/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2024-02-22 09:21:31
 * @LastEditors: ydfk
 * @LastEditTime: 2024-02-22 15:38:12
 */
/// <reference types="vite/client" />
/// <reference types="vue/ref-macros" />

interface ImportMetaEnv {
  VITE_PORT: number;
  VITE_USE_MOCK: boolean;
  VITE_PROXY_HOST: string;
  VITE_API_URL: string;
  VITE_GLOB_APP_TITLE: string;
  VITE_ENABLE_ANALYZE: boolean;
}
