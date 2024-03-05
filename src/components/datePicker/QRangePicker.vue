<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2024-03-04 15:00:29
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-04 15:00:40
-->
<template>
  <a-range-picker
    class="w-full"
    v-model:value="rangeValue"
    :format="rangeFormat"
    :placeholder="placeholder"
    :allowClear="allowClear"
    :disabled="disabled"
    :disabled-date="disabledDate"
    :disabled-time="disabledTime"
    :show-time="showTime"
    @change="onChange" />
</template>
<script setup lang="ts">
  import { DATE_FORMAT, DATE_FORMAT_HAS_TIME, DATE_FORMAT_TRANSMISSION } from "@/commons/const";
  import dayjs, { Dayjs } from "dayjs";
  import { Form } from "ant-design-vue";
  import { DisabledTime } from "./model";

  const formItemContext = Form.useInjectFormItemContext();

  type RangeValue = [Dayjs, Dayjs];

  interface Props {
    value: [string, string] | null | undefined;
    disabled?: boolean;
    allowClear?: boolean;
    showTime?: boolean;
    placeholder?: [string, string];
    format?: string;
    disabledTime?: (date: Dayjs, type: "start" | "end") => DisabledTime;
    disabledDate?: (current: Dayjs) => Boolean;
  }

  const {
    value,
    placeholder = ["请选择开始时间", "请选择结束时间"],
    showTime = false,
    allowClear = false,
    disabled = false,
    format,
  } = defineProps<Props>();

  interface Emits {
    (e: "update:value", arg: [string, string] | null): void;
    (e: "change", arg: [string, string] | null): void;
  }
  const emit = defineEmits<Emits>();

  let rangeValue = ref<RangeValue>();
  let rangeFormat = computed<string>(() => {
    if (format) {
      return format;
    } else if (showTime) {
      return DATE_FORMAT_HAS_TIME;
    } else {
      return DATE_FORMAT;
    }
  });

  const onChange = (dates: [Dayjs, Dayjs], dateStrings: [string, string]) => {
    let formatValue: [string, string] | null = null;
    if (dates) {
      // if (!showTime) {
      //   dates[0] = dates[0].hour(0).minute(0).second(0).millisecond(0);
      //   dates[1] = dates[1].hour(0).minute(0).second(0).millisecond(0);
      // }
      dates[0] = dates[0].hour(0).minute(0).second(0).millisecond(0);
      dates[1] = dates[1].hour(23).minute(59).second(59).millisecond(0);
      formatValue = [dates[0].format(DATE_FORMAT_TRANSMISSION), dates[1].format(DATE_FORMAT_TRANSMISSION)];
    }

    emit("update:value", formatValue);
    emit("change", formatValue);
    formItemContext.onFieldChange();
  };

  watch(
    () => value,
    (newVal, oldVal) => {
      if (newVal && newVal.length > 1 && newVal[0] && newVal[1] && newVal != oldVal) {
        rangeValue.value = [dayjs(newVal[0]), dayjs(newVal[1])];
      } else {
        rangeValue.value = undefined;
      }
    },
    {
      immediate: true,
    }
  );
</script>
<style scoped lang="scss"></style>
