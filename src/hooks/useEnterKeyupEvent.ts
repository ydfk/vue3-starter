/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2024-03-04 16:00:20
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-04 16:12:39
 */
import { onMounted, onBeforeUnmount } from "vue";

export default (func: Function) => {
  const listener = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      func();
    }
  };

  onMounted(() => window.addEventListener("keyup", listener, false));
  onBeforeUnmount(() => window.removeEventListener("keyup", listener));
};
