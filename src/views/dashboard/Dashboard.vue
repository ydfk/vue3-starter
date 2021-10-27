<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-26 16:45:57
 * @LastEditors: ydfk
 * @LastEditTime: 2021-09-16 21:04:35
-->
<template>
  <div class="dashboard">
    {{ msg }}

    <br />
    appState Loading 状态 {{ appStore.loading }}
    <br />
    <button @click="changeLoading">设置appState loading</button>
    <br />
    <router-link :to="{ name: 'login' }"> 返回登录 </router-link>
  </div>
</template>

<script lang="ts" setup>
  import { useAppStore } from "@/stores/modules/app";

  const msg = "这是dashboard";
  const appStore = useAppStore();

  const changeloading = () => {
    if (appStore.loading) {
      appStore.setLoading(false);
    } else {
      appStore.setLoading(true);
    }
  };
</script>

<style lang="scss" scoped></style>
