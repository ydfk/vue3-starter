<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-26 09:16:24
 * @LastEditors: ydfk
 * @LastEditTime: 2021-08-26 17:38:40
-->
<template>
  <div class="login">
    <div class="title">这是登录</div>
    <router-link :to="{ name: 'dashboard' }"> 主页 </router-link>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  .title {
    @include flex;
  }
</style>
