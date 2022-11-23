<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-10-24 15:11:08
 * @LastEditors: ydfk
 * @LastEditTime: 2022-10-27 21:31:43
-->
<template>
  <div>
    <a-skeleton active :loading="initializing">
      <TableSearch v-if="showSearch" v-model:searchText="searchText" @search="onSearch" @reset="onReset">
        <template #searchLeft><slot name="searchLeft"></slot></template>
        <template #searchRight><slot name="searchRight"></slot></template>
      </TableSearch>
      <a-table
        class="mt-1"
        bordered
        :columns="tableColumns"
        :dataSource="dataSource"
        :loading="loading"
        :pagination="pagination"
        :row-key="(record) => record.id"
        @resizeColumn="handleResizeColumn"
        @change="handleTableChange">
        <template #bodyCell="{ text, record, index, column }">
          <template v-if="column.dataIndex === 'index'">{{ index + 1 + (pageIndex - 1) * pageSize }}</template>
          <template v-if="column.dataIndex === 'action'">
            <TableActionComponent :actions="record.action" @action="(key) => onAction(key, record)" />
          </template>
          <slot v-else :name="column.dataIndex" :text="text" :record="record" :column="column"> {{ text }} </slot>
        </template>
      </a-table></a-skeleton
    >
  </div>
</template>
<script lang="ts" setup>
  import { TableActionKeyEnum } from "./enum";
  import type { TableAction, TableColumn } from "./model";
  import { doHttp } from "@/utils/http/axios";
  import { PagedResult } from "@/commons/models/base";
  import TableActionComponent from "./TableAction.vue";
  import type { TableProps } from "ant-design-vue";
  import type { TablePaginationConfig } from "ant-design-vue/es/table/Table";
  import useMitt from "@/hooks/useMitt";

  interface Props {
    columns: TableColumn[];
    queryApi: string;
    showSearch?: boolean;
    getActions?: (model: any) => TableAction[];
  }

  interface Emits {
    (e: "search", arg: string): void;
    (e: "reset", arg: string): void;
    (e: "action", arg1: TableActionKeyEnum, arg2: any): void;
  }

  let { columns, queryApi, getActions, showSearch = true } = defineProps<Props>();

  const emit = defineEmits<Emits>();

  const { registerEmitter } = useMitt();

  let searchText = $ref<string>("");
  let loading = $ref(false);
  let initializing = $ref(true);

  let pageIndex = $ref(1);
  let pageSize = $ref(10);
  let total = $ref(0);

  let dataSource = $ref<any[]>([]);
  let tableColumns = $ref<TableColumn[]>([]);

  let pagination = $computed(() => ({
    total: total,
    current: pageIndex,
    showTotal: (total) => `共 ${total} 条数据`,
  }));

  const onAction = (action: TableActionKeyEnum, record) => emit("action", action, record);

  const fetchData = async () => {
    loading = true;
    const pageResult = await doHttp.post<PagedResult<any>>({
      url: queryApi,
      data: {
        searchText: searchText || "",
        pageSize: pageSize,
        pageIndex,
      },
    });
    loading = false;

    if (pageResult) {
      total = pageResult.totalCount;
      dataSource = pageResult.data;
    }

    if (dataSource && dataSource.length > 0 && getActions) {
      for (const data of dataSource) {
        data["action"] = getActions(data);
      }
    }
  };

  const onSearch = () => fetchData();
  const onReset = () => fetchData();

  const handleTableChange: TableProps["onChange"] = async (pag: TablePaginationConfig) => {
    pageIndex = pag.current || 0;
    pageSize = pag.pageSize || 10;
    await fetchData();
  };

  const setTableColumns = () => {
    if (columns && columns.length > 0) {
      tableColumns = [{ title: "序号", dataIndex: "index", width: "50px" }, ...columns];

      if (dataSource && dataSource.some((x) => x["action"])) {
        tableColumns.push({ title: "操作", dataIndex: "action", width: "110px" });
      }

      tableColumns.forEach((x) => (x.resizable = true));
    }
  };

  const handleResizeColumn = (w, col) => {
    col.width = w;
  };

  registerEmitter("TableRefresh", onSearch);

  onMounted(async () => {
    initializing = true;
    await fetchData();
    setTableColumns();
    initializing = false;
  });
</script>
