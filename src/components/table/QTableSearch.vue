<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-10-24 15:13:33
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-28 11:30:07
-->
<template>
  <div class="table-header">
    <a-row type="flex" justify="space-between">
      <a-col :xl="18" :xxl="16">
        <div class="table-header-left">
          <slot name="searchLeft" :onSearch="onSearch" :onReset="onReset">
            <a-input class="table-header-searchText" v-model:value="text" placeholder="请输入关键字查询" @change="onSearchTextChange" />
            <a-button-group class="table-header-search-btn">
              <a-button type="primary" @click="onSearch">
                <template #icon><SearchOutlined /></template>
                查询
              </a-button>
              <a-button @click="onReset">
                <template #icon><undo-outlined /></template>
                重置
              </a-button>
            </a-button-group>
          </slot>
        </div>
      </a-col>
      <a-col :xl="6" :xxl="8">
        <div class="table-header-right">
          <slot name="searchRight"></slot>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      searchText: string;
    }>(),
    {
      searchText: "",
    }
  );
  const emit = defineEmits<{
    (e: "reset", arg: string | undefined): void;
    (e: "search", arg: string | undefined): void;
    (e: "update:searchText", arg: string | undefined): void;
  }>();

  let text = ref<string | undefined>(undefined);

  const onSearch = () => {
    emit("update:searchText", text.value);
    emit("search", text.value);
  };

  const onReset = () => {
    text.value = "";
    emit("update:searchText", text.value);
    emit("reset", text.value);
  };

  const onSearchTextChange = () => emit("update:searchText", text.value);

  watch(
    () => props.searchText,
    (val) => (text.value = val)
  );

  useEventListener(document, "keyup", (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      onSearch();
    }
  });
</script>
<style scoped lang="scss">
  .table-header {
    .table-header-left {
      display: flex;
      align-items: center;
      justify-content: left;
    }

    .table-header-right {
      display: flex;
      align-items: center;
      justify-content: right;
    }
  }
</style>
