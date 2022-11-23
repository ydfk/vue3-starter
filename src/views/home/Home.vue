<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-26 16:44:06
 * @LastEditors: ydfk
 * @LastEditTime: 2022-11-23 15:02:00
-->
<template>
  <div class="home h-[100vh]">
    <a-layout>
      <Header />
      <a-layout>
        <a-layout>
          <a-layout-content>
            <div class="content">
              <div class="content-box"><router-view /></div>
            </div>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
  import Header from "./Header.vue";
  import { useAppStore } from "@/stores/modules/app";

  const route = useRoute();
</script>
<style lang="scss" scoped>
  %content-box-com {
    padding: 15px;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 0 24px 0 rgb(39 40 72 / 6%);
  }

  .content {
    min-height: calc(100vh - $header-height);
    padding: 13px 32px 32px;
    margin-top: $header-height;

    .content-box {
      @extend %content-box-com;

      min-height: calc(100vh - $header-height - 45px);
    }
  }
</style>
