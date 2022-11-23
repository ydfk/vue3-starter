<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-10-27 16:31:55
 * @LastEditors: ydfk
 * @LastEditTime: 2022-10-27 21:29:00
-->
<template>
  <div v-if="actions.length == 1">
    <TableActionItem :action="actions[0]" @action="onAction" />
  </div>
  <div v-if="actions.length == 2">
    <TableActionItem :action="actions[0]" @action="onAction" />
    <a-divider type="vertical" />
    <TableActionItem :action="actions[1]" @action="onAction" />
  </div>
  <div v-if="actions.length > 2">
    <TableActionItem :action="actions[0]" @action="onAction" />
    <a-divider type="vertical" />
    <a-dropdown overlayClassName="tableAction">
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="action in menuActions" :key="action.key">
            <TableActionItem :action="action" @action="onAction" />
          </a-menu-item>
        </a-menu>
      </template>
      <a>
        更多
        <down-outlined />
      </a>
    </a-dropdown> </div
></template>
<script setup lang="ts">
  import type { TableActionKeyEnum } from "./enum";
  import type { TableAction } from "./model";
  import TableActionItem from "./TableActionItem.vue";

  interface Props {
    actions: TableAction[];
  }

  interface Emits {
    (e: "action", arg: TableActionKeyEnum): void;
  }

  let { actions } = defineProps<Props>();
  const emit = defineEmits<Emits>();

  let menuActions = $computed(() => {
    if (actions && actions.length > 2) {
      return actions.slice(1, actions.length);
    } else {
      return [];
    }
  });

  const onAction = (key: TableActionKeyEnum) => emit("action", key);
</script>
<style scoped lang="scss">
  :deep(.ant-divider-vertical) {
    margin: 0px !important;
  }
</style>
