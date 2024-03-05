<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2023-01-01 14:55:28
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-04 15:16:30
-->
<template>
  <a-cascader
    class="w-full"
    v-model:value="selectValue"
    :disabled="disabled"
    :allowClear="allowClear"
    :multiple="multiple"
    :options="options"
    :showSearch="search"
    :placeholder="placeholder"
    @change="onChange" />
</template>
<script setup lang="ts">
  import { Form } from "ant-design-vue";
  import { CascaderOptionModel } from "./model";
  import { getCascaderPath, getCascaderSearch } from "./method";

  const formItemContext = Form.useInjectFormItemContext();

  interface Props {
    value: string | string[] | null;
    options: CascaderOptionModel[];
    allowClear?: boolean;
    disabled?: boolean;
    placeholder?: string;
    multiple?: boolean;
    showSearch?: boolean;
  }

  const {
    value,
    options = [],
    placeholder = "请选择",
    disabled = false,
    allowClear = false,
    multiple = false,
    showSearch = true,
  } = defineProps<Props>();

  interface Emits {
    (e: "update:value", arg: string | string[]): void;
    (e: "change", arg: string | string[]): void;
  }
  const emit = defineEmits<Emits>();

  let selectValue = ref<string[] | string[][]>();
  let search = computed(() => {
    if (showSearch) {
      return getCascaderSearch();
    } else {
      return false;
    }
  });

  const onChange = (value: string[] | string[][]) => {
    if (multiple) {
      let realSelectValue: string[] = [];

      for (const v of value as string[][]) {
        realSelectValue.push(v[v.length - 1]);
      }

      emit("update:value", realSelectValue);
      emit("change", realSelectValue);
    } else {
      emit("update:value", value[value.length - 1]);
      emit("change", value[value.length - 1]);
    }

    formItemContext.onFieldChange();
  };

  watch(
    () => value,
    (newVal, oldVal) => {
      if (newVal != null && newVal != undefined && newVal != oldVal) {
        if (multiple) {
          selectValue.value = [[]];
          for (const v of newVal as string[]) {
            selectValue.value.push(getCascaderPath(v, options));
          }
        } else {
          selectValue.value = getCascaderPath(newVal as string, options);
        }
      }
    },
    { immediate: true }
  );
</script>
<style scoped lang="scss"></style>
