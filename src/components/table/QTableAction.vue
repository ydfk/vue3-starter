<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-10-27 16:31:55
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-28 11:31:36
-->
<template>
  <div v-if="actions.length == 1">
    <QTableActionItem :action="actions[0]" :row-data="rowData" @action="onAction" />
  </div>
  <div v-if="actions.length == 2">
    <QTableActionItem :action="actions[0]" :row-data="rowData" @action="onAction" />
    <a-divider type="vertical" />
    <QTableActionItem :action="actions[1]" :row-data="rowData" @action="onAction" />
  </div>
  <div v-if="actions.length > 2">
    <QTableActionItem :action="actions[0]" :row-data="rowData" @action="onAction" />
    <a-divider type="vertical" />
    <a-dropdown overlayClassName="tableAction">
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="action in menuActions" :key="action.key">
            <QTableActionItem :action="action" :row-data="rowData" @action="onAction" />
          </a-menu-item>
        </a-menu>
      </template>
      <a>
        更多
        <down-outlined />
      </a>
    </a-dropdown>
  </div>
</template>
<script setup lang="ts">
  import type { TableActionKeyEnum } from "./enum";
  import type { TableAction } from "./model";

  interface Props {
    actions: TableAction[];
    rowData: any;
  }

  //let { actions, rowData } = defineProps<Props>();
  const props = defineProps<Props>();
  const emit = defineEmits<{
    (e: "action", arg: TableActionKeyEnum): void;
  }>();

  let menuActions = computed(() => {
    if (props.actions && props.actions.length > 2) {
      return props.actions.slice(1, props.actions.length);
    } else {
      return [];
    }
  });

  const onAction = (key: TableActionKeyEnum) => emit("action", key);
</script>
<style scoped lang="scss">
  :deep(.ant-divider-vertical) {
    margin: 0 !important;
  }
</style>
