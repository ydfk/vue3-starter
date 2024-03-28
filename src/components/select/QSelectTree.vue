<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-29 15:03:45
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-28 11:27:46
 * @FilePath: \work-space-web\src\components\select\QSelectTree.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-tree-select
    v-model:value="selectValue"
    class="w-full"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    allow-clear
    :multiple="isMultiple"
    :placeholder="placeholder"
    :tree-data="treeData"
    :fieldNames="fieldNames"
    :treeDefaultExpandAll="treeDefaultExpandAll"
    @select="onSelect"
    @change="dataChange" />
</template>
<script setup lang="ts">
  import type { FieldNames } from "ant-design-vue/lib/vc-tree-select/TreeSelect";

  interface Props {
    treeData: [];
    isMultiple: boolean;
    placeholder?: string;
    fieldNames?: FieldNames;
    treeDefaultExpandAll?: boolean;
  }
  // let { treeData = [], isMultiple = false, placeholder = "不限", fieldNames, treeDefaultExpandAll = false } = defineProps<Props>();

  const props = withDefaults(defineProps<Props>(), {
    treeData: () => [],
    isMultiple: false,
    placeholder: "不限",
    treeDefaultExpandAll: false,
  });

  const value = defineModel<string>("");
  const emit = defineEmits<{
    (e: "select-tree-click", arg: any): void;
    (e: "change", arg: any): void;
  }>();
  let selectValue = ref<string | null | string[]>();

  const onSelect = () => {
    emit("select-tree-click", selectValue);
  };

  const dataChange = (value, label, extra) => {
    emit("change", value);
  };

  watch(
    () => value,
    (newVal, oldVal) => {
      selectValue.value = newVal.value;
    },
    {
      immediate: true,
    }
  );
</script>
<style lang="scss">
  .ant-select-tree-node-content-wrapper {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
