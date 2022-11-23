<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-04-20 08:59:59
 * @LastEditors: ydfk
 * @LastEditTime: 2022-10-26 13:49:02
-->
<template>
  <a-modal
    :visible="visible"
    :bodyStyle="bodyStyle"
    :keyboard="false"
    :maskClosable="false"
    :width="modalWidth"
    :title="title"
    @ok="onOk"
    @cancel="onCancel"
    :okText="okText"
    :cancel-text="cancelText">
    <slot></slot>
  </a-modal>
</template>
<script setup lang="ts">
  interface Props {
    visible: boolean;
    title: string;
    width?: number;
    okText?: string;
    cancelText?: string;
  }

  interface Emits {
    (e: "ok"): void;
    (e: "cancel"): void;
  }

  let { visible = true, title, width = 600, okText = "确定", cancelText = "取消" } = defineProps<Props>();

  const emit = defineEmits<Emits>();

  let modalWidth = $computed(() => `${width}px`);

  let maxHeight = $computed(() => document.body.clientHeight - 80);

  let bodyStyle = $computed(() => {
    return { "max-height": `${maxHeight}px`, overflow: "auto", padding: "10px 15px" };
  });

  const onOk = () => emit("ok");
  const onCancel = () => emit("cancel");
</script>
