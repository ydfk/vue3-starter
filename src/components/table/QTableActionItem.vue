<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-10-27 16:33:51
 * @LastEditors: zhaozijun zaozijun@foxmail.com
 * @LastEditTime: 2023-11-29 15:00:01
-->
<template>
  <a-button
    v-if="action.show(rowData)"
    type="link"
    size="small"
    :class="action.key"
    :disabled="action.disabled(rowData)"
    @click="onAction(action.key)">
    <template #icon>
      <img class="inline mr-4px" :src="action.image" />
    </template>
    <span class="align-middle">{{ action.title }}</span>
  </a-button>
</template>
<script setup lang="ts">
  import type { TableActionKeyEnum } from "./enum";
  import type { TableAction } from "./model";

  interface Props {
    action: TableAction;
    rowData: any;
  }

  // const { action, rowData } = defineProps<Props>();
  const props = defineProps<Props>();
  const emit = defineEmits<{
    (e: "action", arg: TableActionKeyEnum): void;
  }>();

  const onAction = (key: TableActionKeyEnum) => emit("action", key);
</script>
<style scoped lang="scss">
  .delete,
  .disable {
    color: red;
  }
</style>
