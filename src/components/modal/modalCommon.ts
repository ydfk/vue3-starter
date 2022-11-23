/*
 * @Description: Copyright (c) tsm. All rights reserved
 * @Author: tsm
 * @Date: 2022-04-14 10:51:41
 * @LastEditors: ydfk
 * @LastEditTime: 2022-04-19 21:27:02
 */

import { Modal } from "ant-design-vue";

export const openDeleteModal = (
  onOk: () => void,
  title = "删除",
  content = "您确认要删除吗？",
  onCancel?: () => void,
  okText = "确认",
  cancelText = "取消"
) => {
  Modal.confirm({
    title,
    content,
    onOk,
    onCancel,
    okText,
    cancelText,
    okType: "danger",
  });
};

export const openConfirmModal = (title: string, content: string, onOk: () => void, onCancel?: () => void, okText = "确认", cancelText = "取消") => {
  Modal.confirm({ title, content, onOk, onCancel, okText, cancelText });
};

export const openSuccessModal = (title: string, content: string, onOk?: () => void, okText = "确认") => {
  Modal.success({ title, content, onOk, okText });
};

export const openWarnModal = (title: string, content: string, onOk?: () => void, okText = "确认") => {
  Modal.warning({ title, content, onOk, okText });
};

export const openInfoModal = (title: string, content: string, onOk?: () => void, okText = "确认") => {
  Modal.info({ title, content, onOk, okText });
};

export const openErrorModal = (title: string, content: string, onOk?: () => void, okText = "确认") => {
  Modal.error({ title, content, onOk, okText });
};
