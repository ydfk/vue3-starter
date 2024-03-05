<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2024-03-04 15:04:42
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-04 15:04:52
-->
<template>
  <a-input-number
    class="w-full"
    v-model:value="inputValue"
    :disabled="disabled"
    :placeholder="placeholder"
    :addon-before="addonBefore"
    :addon-after="addonAfter"
    :controls="controls"
    :max="max"
    :min="min"
    :step="step"
    :precision="precision"
    :prefix="prefix"
    :formatter="formatter"
    :parser="parser"
    @change="onChange" />
</template>
<script setup lang="ts">
  import { INPUT_NUMBER_MAX, INPUT_NUMBER_MIN, INPUT_NUMBER_STEP } from "@/commons/const";
  import { Form } from "ant-design-vue";

  const formItemContext = Form.useInjectFormItemContext();

  interface Props {
    value: number | null;
    disabled?: boolean;
    placeholder?: string;
    controls?: boolean;
    addonBefore?: string;
    addonAfter?: string;
    max?: number;
    min?: number;
    step?: number;
    prefix?: string;
    isPercentage?: boolean;
    precision?: number;
  }
  const {
    value,
    placeholder = "请输入",
    disabled = false,
    controls = true,
    precision = 2,
    max = INPUT_NUMBER_MAX,
    min = INPUT_NUMBER_MIN,
    step = INPUT_NUMBER_STEP,
    isPercentage = false,
  } = defineProps<Props>();

  interface Emits {
    (e: "update:value", arg: number | null): void;
    (e: "change", arg: number | null): void;
  }
  const emit = defineEmits<Emits>();

  let inputValue = ref<number | null>();

  const formatter = (value: number, info: { userTyping: boolean; input: string }) => {
    const v = `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (isPercentage && v) {
      return `${v}%`;
    } else {
      return v;
    }
  };

  const parser = (value: string) => {
    const v = value.replace(/$s?|(,*)/g, "");
    if (isPercentage) {
      return v.replace("%", "");
    } else {
      return v;
    }
  };

  const onChange = (value: number) => {
    emit("update:value", value);
    emit("change", value);
    formItemContext.onFieldChange();
  };

  watch(
    () => value,
    (newVal, oldVal) => {
      if (newVal != oldVal) {
        inputValue.value = newVal;
      }
    },
    { immediate: true }
  );
</script>
<style scoped lang="scss"></style>
