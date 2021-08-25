<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-24 17:24:45
 * @LastEditors: ydfk
 * @LastEditTime: 2021-08-25 18:26:25
-->
<template>
  <span class="title">{{ title }}</span>
  <RouterView />
</template>

<script lang="ts" setup>
  const title = "vue3 starter";
</script>

<style lang="scss">
  @import "./styles/var.scss";

  body {
    font-family: $fontFamily;
  }

  .title {
    color: red;
  }
</style>
