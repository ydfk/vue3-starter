<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2024-03-04 15:02:18
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-04 15:02:32
-->
<template>
  <a-modal
    :visible="visible"
    :bodyStyle="bodyStyle"
    :keyboard="false"
    :maskClosable="false"
    :width="modalWidth"
    :title="title"
    @cancel="emit('cancel')"
    :okText="okText"
    :zIndex="zIndex"
    :footer="showFooter ? undefined : null"
    :cancel-text="cancelText">
    <slot></slot>
    <template #footer>
      <slot name="footer">
        <a-row type="flex" justify="space-between">
          <a-col :span="12" class="left">
            <slot name="footerLeft"></slot>
          </a-col>
          <a-col :span="12" class="right">
            <slot name="footerRight">
              <a-button type="default" v-if="showCancelBtn" @click="emit('cancel')">{{ cancelText }}</a-button>
              <a-button type="primary" :loading="okLoading" v-if="showOkBtn" @click="emit('ok')">{{ okText }}</a-button>
            </slot>
          </a-col>
        </a-row>
      </slot>
    </template>
  </a-modal>
</template>
<script setup lang="ts">
  import { DIALOG_Z_INDEX } from "@/commons/const";

  interface Props {
    visible: boolean;
    title: string;
    width?: number;
    okText?: string;
    cancelText?: string;
    showCancelBtn?: boolean;
    showOkBtn?: boolean;
    okLoading?: boolean;
    bodyPadding?: string;
    showFooter?: boolean;
    zIndex?: number;
  }

  interface Emits {
    (e: "ok"): void;
    (e: "cancel"): void;
  }

  let {
    visible = true,
    title,
    width = 800,
    okText = "确定",
    cancelText = "取消",
    showCancelBtn = true,
    showOkBtn = true,
    bodyPadding = "",
    okLoading = false,
    showFooter = true,
    zIndex = DIALOG_Z_INDEX,
  } = defineProps<Props>();

  const emit = defineEmits<Emits>();

  let modalWidth = computed(() => `${width}px`);

  let maxHeight = computed(() => document.body.clientHeight - 200);

  let bodyStyle = computed(() => {
    if (bodyPadding) {
      return { "max-height": `${maxHeight}px`, overflow: "auto", padding: bodyPadding };
    } else {
      return { "max-height": `${maxHeight}px`, overflow: "auto" };
    }
  });
</script>
