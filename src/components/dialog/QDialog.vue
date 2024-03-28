<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2024-03-04 15:02:18
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-28 10:14:38
-->
<template>
  <a-modal
    :open="open"
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

  export interface Props {
    open: boolean;
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

  const props = withDefaults(defineProps<Props>(), {
    open: true,
    title: "",
    width: 800,
    okText: "确定",
    cancelText: "取消",
    showCancelBtn: true,
    showOkBtn: true,
    bodyPadding: "",
    okLoading: false,
    showFooter: true,
    zIndex: DIALOG_Z_INDEX,
  });

  const emit = defineEmits<{
    ok: [];
    cancel: [];
  }>();

  const modalWidth = computed(() => `${props.width}px`);

  const maxHeight = computed(() => document.body.clientHeight - 200);

  const bodyStyle = computed(() => {
    if (props.bodyPadding) {
      return { "max-height": `${maxHeight}px`, overflow: "auto", padding: props.bodyPadding };
    } else {
      return { "max-height": `${maxHeight}px`, overflow: "auto" };
    }
  });
</script>
