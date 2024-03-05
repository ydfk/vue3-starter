<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2024-03-04 15:15:19
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-04 15:15:31
-->
<template>
  <svg :class="svgClass" :style="getStyle" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
  const {
    name,
    className = "",
    size = "24",
  } = defineProps<{
    name: string;
    className?: string;
    size?: string | number;
  }>();

  const iconName = computed(() => {
    return `#icon-${name}`;
  });
  const svgClass = computed(() => {
    return className ? "svg-icon " + className : "svg-icon";
  });
  const getStyle = computed(() => {
    const res = size + "px";
    return {
      width: res,
      height: res,
    };
  });
</script>

<style scoped lang="scss">
  // .svg-icon {
  //   color: transparent;
  // }
</style>
