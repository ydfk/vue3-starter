<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-04-13 13:45:37
 * @LastEditors: ydfk
 * @LastEditTime: 2024-02-27 14:25:18
-->
<template>
  <a-layout>
    <a-layout-header class="header">
      <a-row :gutter="8" justify="space-between">
        <a-col :span="3">
          <Logo />
        </a-col>
        <a-col :span="18"> 菜单 </a-col>
        <a-col :span="3">
          <a-dropdown :trigger="['click']" :placement="'bottomRight'" :overlayStyle="overlayStyle" class="cursor-pointer">
            <span class="ant-dropdown-link flex-right cursor-pointer">
              <user-outlined style="color: white" />
              <span class="name" style="color: white">&nbsp;{{ userState.user.name }}&nbsp;&nbsp;</span>
              <down-outlined style="color: white" />
            </span>
            <template #overlay>
              <a-menu @click="onUserNameMenuClick">
                <a-menu-item class="mt-5" key="0">
                  <logout-outlined />
                  <span>退出登录</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-col>
      </a-row>
    </a-layout-header>
  </a-layout>
</template>

<script setup lang="ts">
  import Logo from "./Logo.vue";
  import { RouterEnum } from "@/enums/router";
  import { useUserStore } from "@/stores/modules/user";
  import { useAppStore } from "@/stores/modules/app";
  import type { MenuProps } from "ant-design-vue";
  import { MenuInfo } from "ant-design-vue/lib/menu/src/interface";
  import { openConfirmModal } from "@/components/modal/modalCommon";

  const overlayStyle = ref({
    width: "120px",
    minWidth: "120px",
  });

  const userState = useUserStore();
  const router = useRouter();
  const route = useRoute();

  const selectedKeys = ref<string[]>([route.path.split("/")[2]]);

  const onUserNameMenuClick = () => {
    openConfirmModal("退出", "确定退出登录吗？", () => {
      userState.clearUser();
      router.replace(RouterEnum.Login);
    });
  };

  const onMenuClick: MenuProps["onClick"] = (info: MenuInfo) => {
    let routerName = info.key as string;
    if (routerName) {
      const currentRoute = router.getRoutes().find((f) => f.name == routerName);
      if (currentRoute && currentRoute.children && currentRoute.children.length > 0 && currentRoute.meta && currentRoute.meta.showSider) {
        routerName = currentRoute.children[0].name as string;
      }
      router.push({ name: routerName });
    }
  };
</script>
<style lang="scss" scoped>
  $header-color: #272848;

  .header {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: $header-height;
    background-color: $header-color;
  }

  :deep(.header-menu) {
    height: $header-height;
    background-color: $header-color;
    color: #ddd;
    font-size: 14px;

    .ant-menu-item-selected {
      border-bottom: 3px solid #fff;
      background-color: $header-color;
      color: #fff;
    }

    .ant-menu-item:hover {
      background-color: $header-color;
    }
  }
</style>
