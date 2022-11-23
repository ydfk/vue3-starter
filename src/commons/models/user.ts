/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-04-14 11:25:02
 * @LastEditors: ydfk
 * @LastEditTime: 2022-11-23 14:54:12
 */

import { BaseModel, PageQueryModel } from "./base";

export interface UserModel {
  id: string;
  name: string;
  displayName: string;
  code: string;
  labels: string;
  dailyStandardPoints: number;
  location: string;
  relevantWorkYears: number;
  rankName: string;
  isProjectDirector: boolean;
  labelList: string[];
  otherTeamLocked: boolean;
  projectDirectorUserId: string;
  canSetBasicSetting: boolean;
}
