/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2022-07-07 14:05:12
 * @LastEditors: ydfk
 * @LastEditTime: 2022-07-07 14:38:35
 */
import dayjs from "dayjs";

/**
 * 获取时间在这个月的第几周
 * @param date 时间
 */
export const getDayWeekInMonth = (date: Date): number => {
  const monthStart = dayjs(date).startOf("month");

  let startWeek = monthStart.day();
  if (startWeek === 0) {
    startWeek = 7;
  }

  const firstWeekEnd = monthStart.add(7 - startWeek, "day");

  if (dayjs(date).isSameOrBefore(firstWeekEnd)) {
    return 1;
  } else {
    const nextWeekStart = firstWeekEnd.date() + 1;
    const days = dayjs(date).date() - nextWeekStart;
    if (days == 0) {
      return 2;
    } else {
      return Math.ceil(days / 6.9) + 1;
    }
  }
};
