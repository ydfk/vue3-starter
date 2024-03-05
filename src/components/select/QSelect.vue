<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2023-01-01 13:27:38
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-04 15:17:50
-->
<template>
  <a-select
    class="w-full"
    v-model:value="selectValue"
    :disabled="disabled"
    :allowClear="allowClear"
    :placeholder="placeholder"
    :mode="mode"
    :showSearch="showSearch"
    :filterOption="filterOption"
    @change="onChange">
    <a-select-option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</a-select-option>
  </a-select>
</template>
<script setup lang="ts">
  import type { SelectOptionModel } from "./model";
  import { Form } from "ant-design-vue";

  const formItemContext = Form.useInjectFormItemContext();

  interface Props {
    value: string | string[] | null | undefined;
    options: SelectOptionModel[];
    allowClear?: boolean;
    disabled?: boolean;
    placeholder?: string;
    mode?: "multiple" | "tags" | undefined;
    showSearch?: boolean;
  }

  const {
    value,
    options = [],
    placeholder = "请选择",
    disabled = false,
    allowClear = true,
    mode = undefined,
    showSearch = true,
  } = defineProps<Props>();

  let selectValue = ref<string | string[]>();

  interface Emits {
    (e: "update:value", arg: string | string[]): void;
    (e: "change", arg: string | string[]): void;
  }
  const emit = defineEmits<Emits>();

  const filterOption = (inputValue, option) => {
    const selectOption = options.find((x) => x.value == option.value);

    return (
      selectOption &&
      (selectOption.label.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 ||
        (selectOption.pinyin && selectOption.pinyin.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0) ||
        (selectOption.fullPinyin && selectOption.fullPinyin.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0))
    );
  };

  const onChange = (value: string | string[]) => {
    emit("update:value", value);
    emit("change", value);
    formItemContext.onFieldChange();
  };

  watch(
    () => value,
    (newVal, oldVal) => {
      if (newVal == null && newVal == undefined) {
        selectValue.value = undefined;
        return;
      }
      if (newVal != null && newVal != undefined && newVal != oldVal) {
        selectValue.value = newVal;
      }
    },
    { immediate: true }
  );
</script>
<style scoped lang="scss"></style>
