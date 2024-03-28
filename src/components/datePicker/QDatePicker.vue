<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2024-03-04 14:55:11
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-28 10:56:53
-->
<template>
  <a-date-picker
    class="w-full"
    v-model:value="dateValue"
    :format="dateFormat"
    :placeholder="placeholder"
    :allowClear="allowClear"
    :disabled="disabled"
    :disabled-date="disabledDate"
    :disabled-time="disabledTime"
    :show-time="showTime"
    :picker="picker"
    :showToday="showToday"
    @change="onChange" />
</template>
<script setup lang="ts">
  import { DATE_FORMAT, DATE_FORMAT_HAS_TIME, DATE_FORMAT_TRANSMISSION } from "@/commons/const";
  import dayjs, { Dayjs } from "dayjs";
  import { Form } from "ant-design-vue";
  import { DisabledTime } from "./model";

  const formItemContext = Form.useInjectFormItemContext();

  interface Props {
    value: string | null | undefined;
    disabled?: boolean;
    allowClear?: boolean;
    showTime?: boolean;
    placeholder?: string;
    format?: string;
    picker?: "date" | "week" | "month" | "quarter" | "year";
    showToday?: boolean;
    disabledTime?: (date: Dayjs, type: "start" | "end") => DisabledTime;
    disabledDate?: (current: Dayjs) => Boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    allowClear: false,
    showTime: false,
    placeholder: "请选择时间",
    picker: "date",
    showToday: false,
  });

  const emit = defineEmits<{
    (e: "update:value", arg: string | null): void;
    (e: "change", arg: string | null): void;
  }>();

  let dateValue = ref<Dayjs>();
  let dateFormat = computed<string>(() => {
    if (props.format) {
      return props.format;
    } else if (props.showTime) {
      return DATE_FORMAT_HAS_TIME;
    } else {
      return DATE_FORMAT;
    }
  });

  const onChange = (value: Dayjs, dateString: string) => {
    let formatValue;
    if (value != null) {
      formatValue = value.format(DATE_FORMAT_TRANSMISSION);
      if (!props.showTime) {
        formatValue = value.hour(0).minute(0).second(0).millisecond(0).format(DATE_FORMAT_TRANSMISSION);
      }
    } else {
      formatValue = value;
    }

    emit("update:value", formatValue);
    emit("change", formatValue);
    formItemContext.onFieldChange();
  };

  watch(
    () => props.value,
    (newVal, oldVal) => {
      if (!newVal) {
        dateValue.value = undefined;
        return;
      }
      if (newVal && newVal != oldVal) {
        dateValue.value = dayjs(newVal);
      }
    },
    { immediate: true }
  );
</script>
<style scoped lang="scss"></style>
