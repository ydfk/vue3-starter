<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-10-24 15:11:08
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-28 11:47:03
-->
<template>
  <div>
    <a-skeleton active :loading="initializing">
      <QTableSearch v-if="showSearch" class="mb-8px" :searchText="searchText" @search="onSearch" @reset="onReset">
        <template #searchLeft="scope"><slot name="searchLeft" v-bind="scope || {}"></slot></template>
        <template #searchRight><slot name="searchRight"></slot></template>
      </QTableSearch>
      <a-table
        class="mt-1"
        bordered
        :customRow="customRow"
        :columns="tableColumns"
        :dataSource="tableDataSource"
        :loading="loading"
        :pagination="showPage && pagination"
        :row-key="(record) => record.id"
        :row-selection="showSelect ? rowSelection : null"
        @resize-column="handleResizeColumn"
        @change="handleTableChange">
        <template #bodyCell="{ text, record, index, column }">
          <template v-if="column.dataIndex === 'index'">{{ index + 1 + (pageIndex - 1) * pageSize }}</template>
          <template v-if="column.dataIndex === 'action'">
            <QTableAction
              :actions="record.action.filter((x) => x.show(record))"
              :row-data="record"
              @action="(key: TableActionKeyEnum) => onAction(key, record)" />
          </template>
          <slot
            v-else-if="column.customRender"
            :name="column.dataIndex"
            :text="text"
            :record="record"
            :column="column"
            :index="index + 1 + (pageIndex - 1) * pageSize">
          </slot>
          <template v-else>
            <a-tooltip v-if="column.ellipsis" placement="bottomLeft">
              <template #title>{{ text }}</template>
              <slot :name="column.dataIndex" :text="text" :record="record" :column="column" :index="index + 1 + (pageIndex - 1) * pageSize">
                {{ text }}
              </slot>
            </a-tooltip>
            <span class="break-all" v-else>
              <slot :name="column.dataIndex" :text="text" :record="record" :column="column" :index="index + 1 + (pageIndex - 1) * pageSize">
                {{ text }}
              </slot>
            </span>
          </template>
        </template>
      </a-table>
    </a-skeleton>
  </div>
</template>
<script lang="ts" setup>
  import { TableActionKeyEnum } from "./enum";
  import type { TableAction, TableColumn } from "./model";
  import { doHttp } from "@/utils/http/axios";
  import { PageResult, PageQuery } from "@/commons/models/base";
  import type { TableProps } from "ant-design-vue";
  import type { TablePaginationConfig } from "ant-design-vue/es/table/Table";
  import useMitt from "@/hooks/useMitt";
  import { cloneDeep } from "lodash-es";

  interface Props {
    dataSource: any[];
    columns: TableColumn[];
    apiParams?: PageQuery<any>;
    queryApi?: ((data: PageQuery<any>) => Promise<PageResult<any>>) | string;
    showSearch?: boolean;
    showPage?: boolean;
    showRecord?: boolean;
    showSelect?: boolean;
    getActions?: (model: any) => TableAction[];
    customRow?: (record: any) => {};
  }

  // let {
  //   columns,
  //   queryApi,
  //   getActions,
  //   showSearch = true,
  //   dataSource = [],
  //   showPage = true,
  //   showRecord = true,
  //   showSelect = false,
  //   apiParams = {
  //     sortField: "",
  //     sortOrder: "",
  //     param: {},
  //     keyword: "",
  //   },
  //   customRow = () => {},
  // } = defineProps<Props>();

  const props = withDefaults(defineProps<Props>(), {
    dataSource: () => [],
    showSearch: true,
    showPage: true,
    showRecord: true,
    showSelect: false,
    apiParams: () => {
      return {
        sortField: "",
        sortOrder: "",
        param: {},
        keyword: "",
      } as PageQuery<any>;
    },
    customRow: () => {
      return {};
    },
  });

  const emit = defineEmits<{
    (e: "search", arg: string): void;
    (e: "reset", arg: string): void;
    (e: "action", arg1: TableActionKeyEnum, arg2: any): void;
  }>();

  const { registerEmitter } = useMitt();

  const selections = defineModel<Array<string | number>>("selections", { default: [] });

  const rowSelection: TableProps["rowSelection"] = {
    // @ts-ignore
    selectedRowKeys: selections,
    onSelect: (record, selected, selectedRows) => {
      if (selected) {
        selections.value.push(record.id);
      } else {
        const index = selections.value.findIndex((item) => item == record.id);
        selections.value.splice(index, 1);
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      if (selected) {
        selections.value = props.dataSource.map((item) => item.id);
      } else {
        selections.value = [];
      }
    },
  };

  let searchText = ref<string>("");
  let loading = ref(false);
  let initializing = ref(true);

  let pageIndex = ref(1);
  let pageSize = ref(10);
  let total = ref(0);

  let tableDataSource = ref<any[]>([]);
  let tableColumns = ref<TableColumn[]>([]);

  let pagination = computed(() => ({
    total: total,
    current: pageIndex,
    showSizeChanger: false,
    showTotal: (total: number) => `共 ${total} 条数据`,
  }));

  const onAction = (action: TableActionKeyEnum, record: any) => emit("action", action, record);

  const fetchData = async () => {
    loading.value = true;
    if (props.dataSource && props.dataSource.length > 0) {
      let localDataSource = cloneDeep(props.dataSource);
      if (searchText) {
        const pattern = new RegExp(".*" + searchText + ".*");
        localDataSource = localDataSource.filter((row) => {
          return Object.keys(row).some((key) => {
            return pattern.test(String(row[key]));
          });
        });
      }
      total.value = localDataSource.length;
      tableDataSource.value = props.showPage
        ? localDataSource.slice((pageIndex.value - 1) * pageSize.value, pageSize.value * pageIndex.value)
        : localDataSource;
      loading.value = false;
    } else {
      let pageResult: PageResult<any>;
      if (typeof props.queryApi === "string") {
        pageResult = await doHttp.post<PageResult<any>>({
          url: props.queryApi as string,
          data: {
            searchText: searchText || "",
            pageSize: pageSize,
            pageIndex,
          },
        });
      } else {
        if (props.queryApi) {
          pageResult = await props.queryApi({
            ...props.apiParams,
            pageIndex: pageIndex.value,
            pageSize: pageSize.value,
            searchText: searchText.value,
          });
        } else {
          pageResult = {
            total: 0,
            result: [],
            totalPages: 1,
          };
        }
      }

      loading.value = false;

      if (pageResult) {
        total.value = pageResult.total;
        tableDataSource.value = pageResult.result;
      }
    }

    if (tableDataSource && tableDataSource.value.length > 0 && props.getActions) {
      for (const data of tableDataSource.value) {
        data["action"] = props.getActions(data);
      }
    }
  };

  const onSearch = () => {
    pageIndex.value = 1;
    fetchData();
  };

  const onReset = () => {
    pageIndex.value = 1;
    fetchData();
  };

  const handleTableChange: TableProps["onChange"] = async (pag: TablePaginationConfig) => {
    pageIndex.value = pag.current || 0;
    pageSize.value = pag.pageSize || 10;
    await fetchData();
  };

  const setTableColumns = () => {
    if (props.columns && props.columns.length > 0) {
      if (!props.showRecord) {
        tableColumns.value = props.columns;
      } else {
        tableColumns.value = [{ title: "序号", dataIndex: "index", width: 50 }, ...props.columns];
      }

      if (tableDataSource && tableDataSource.value.some((x) => x["action"]) && !tableColumns.value.some((x) => x.dataIndex == "action")) {
        tableColumns.value.push({ title: "操作", dataIndex: "action", width: 120 });
      }

      tableColumns.value.forEach((x) => (x.resizable = true));
    }
  };

  const handleResizeColumn = (w, col) => {
    col.width = w;
  };

  registerEmitter("TableRefresh", onSearch);

  watch(
    () => props.dataSource,
    async () => {
      pageIndex.value = 1;
      fetchData();
    },
    {
      // deep: true,
      immediate: false,
    }
  );

  onMounted(async () => {
    initializing.value = true;
    await fetchData();
    setTableColumns();
    initializing.value = false;
  });
</script>
