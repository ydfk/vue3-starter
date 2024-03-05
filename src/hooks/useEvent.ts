/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2024-03-04 16:00:37
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-04 16:12:48
 */
import { onMounted, onBeforeUnmount } from "vue";

export default (event: string, func: (e: Event) => void) => {
  onMounted(() => window.addEventListener(event, func));
  onBeforeUnmount(() => window.removeEventListener(event, func));
};
