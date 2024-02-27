<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-04-19 18:52:57
 * @LastEditors: ydfk
 * @LastEditTime: 2024-02-27 14:10:00
-->
<template>
  <a-space align="center">
    <img class="w-[45px] h-[35px]" src="../../assets/images/logo.png" /><span class="ml-[10px] system-name">{{ SYSTEM_NAME }}</span>
  </a-space>
</template>
<script setup lang="ts">
  import { SYSTEM_NAME } from "@/commons/const";
</script>
<style lang="scss" scoped>
  .system-name {
    width: 93px;
    height: 18px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 36px;
  }
</style>
