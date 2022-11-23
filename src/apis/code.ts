/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-04-20 16:42:30
 * @LastEditors: ydfk
 * @LastEditTime: 2022-11-23 14:54:53
 */
import { CodeModel } from "@/commons/models/code";
import { doHttp } from "@/utils/http/axios";

/**
 * 获取职档
 * @returns {Promise<CodeModel[]>} 职档列表
 */
export const apiGetRank = (): Promise<CodeModel[]> => doHttp.get<CodeModel[]>({ url: "code/rank" });
