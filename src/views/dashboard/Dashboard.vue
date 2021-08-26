<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-26 16:45:57
 * @LastEditors: ydfk
 * @LastEditTime: 2021-08-26 16:49:58
-->
<template>
  <div class="dashboard">
    {{ msg }}
    <router-link :to="{ name: 'login' }"> 返回登录 </router-link>
  </div>
</template>

<script lang="ts" setup>
  const msg = "这是dashboard";
</script>

<style lang="scss" scoped>
  .dashboard {
    @include flex;
  }
</style>
