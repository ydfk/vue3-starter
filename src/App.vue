<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-24 17:24:45
 * @LastEditors: ydfk
 * @LastEditTime: 2024-02-22 14:41:06
-->
<template>
  <a-config-provider
    :locale="zhCN"
    :theme="{
      token: {
        colorPrimary: '#306BFF',
      },
    }">
    <a-spin wrapperClassName="app-spin" size="large" :spinning="appState.loading">
      <router-view />
    </a-spin>
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { useAppStore } from "@/stores/modules/app";
  import zhCN from "ant-design-vue/es/locale/zh_CN";

  const appState = useAppStore();
</script>

<style lang="scss">
  @import url("./styles/var.scss");
  @import url("./styles/global.scss");
  @import url("./styles/antFix.scss");

  body {
    background-color: $background-color;
    font-family: $font-family;
  }

  #app {
    @apply h-screen;
  }
</style>
