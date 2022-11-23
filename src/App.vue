<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-24 17:24:45
 * @LastEditors: ydfk
 * @LastEditTime: 2022-06-17 11:38:19
-->
<template>
  <a-config-provider :locale="zhCN">
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
  @import "./styles/var.scss";
  @import "./styles/global.scss";
  @import "./styles/antFix.scss";

  body {
    font-family: $fontFamily;
    background-color: $background-color;
  }

  #app {
    @apply h-screen;
  }
</style>
