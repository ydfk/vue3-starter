<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-10-21 10:00:51
 * @LastEditors: ydfk
 * @LastEditTime: 2024-02-27 14:31:31
-->
<template>
  <a-layout-sider width="150" theme="light">
    <div class="menu">
      <a-menu model="inline" v-model:selectedKeys="menuKeys" @click="onMenuClick">
        <a-menu-item v-for="menu in menus" :key="menu.name">
          <component :is="menu.meta?.icon" />
          <span>{{ menu.meta?.title }}</span>
        </a-menu-item>
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
  import type { MenuProps } from "ant-design-vue";

  const route = useRoute();
  const router = useRouter();

  let menus = computed(() => {
    const secondPath = route.path.split("/")[2];

    const secondRoute = router.getRoutes().find((f) => f.name == secondPath);
    if (secondRoute) {
      return secondRoute.children;
    }

    return null;
  });

  let menuKeys = ref<string[]>([route.name as string]);

  const onMenuClick: MenuProps["onClick"] = (menuInfo) => {
    router.push({ name: menuInfo.key as string });
  };
</script>
<style lang="scss" scoped>
  .menu {
    margin-top: calc($header-height + 12px);
  }
</style>
