<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-26 16:45:57
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-05 11:10:53
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

  const changeLoading = () => {
    if (appStore.loading) {
      appStore.loading = false;
    } else {
      appStore.loading = true;
    }
  };
</script>

<style lang="scss" scoped></style>
