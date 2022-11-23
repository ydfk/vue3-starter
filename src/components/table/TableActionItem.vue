<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-10-27 16:33:51
 * @LastEditors: ydfk
 * @LastEditTime: 2022-10-27 21:28:35
-->
<template>
  <a-button type="link" size="small" :class="action.key" @click="onAction(action.key)">{{ action.title }}</a-button>
</template>
<script setup lang="ts">
  import type { TableActionKeyEnum } from "./enum";
  import type { TableAction } from "./model";

  interface Props {
    action: TableAction;
  }

  interface Emits {
    (e: "action", arg: TableActionKeyEnum): void;
  }

  const { action } = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const onAction = (key: TableActionKeyEnum) => emit("action", key);
</script>
<style scoped lang="scss">
  .delete {
    color: red;
  }
</style>
