/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-04-21 11:25:59
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-04 16:06:24
 */

import mitt from "mitt";
import type { Handler } from "mitt";
import { MittType } from "./mittType";

const emitter = mitt<MittType>();

export default function useMitt() {
  const vm = getCurrentInstance()?.proxy;

  if (vm == undefined) {
    throw "must use in setup!";
  }

  /**
   * 注册全局事件
   * @param type 事件类型
   * @param handler 处理方法
   */
  const registerEmitter = <Key extends keyof MittType>(type: Key, handler: Handler<MittType[Key]>): void => {
    onMounted(() => emitter.on(type, handler));
    onUnmounted(() => emitter.off(type, handler));
  };

  /**
   * 触发注册的全局事件
   * @param type 事件类型
   * @param event 参数
   */
  const emitEmitter = <Key extends keyof MittType>(type: Key, event?: MittType[Key]): void => emitter.emit(type, event);

  return {
    registerEmitter,
    emitEmitter,
    clearAll: emitter.all.clear(),
  };
}
