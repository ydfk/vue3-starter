/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-27 12:01:39
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-05 15:37:20
 */
import { MockMethod } from "vite-plugin-mock";
import { resultSuccess, resultError } from "./_util";
import dayjs from "dayjs";

export default [
  {
    url: "/api/token",
    timeout: 100,
    method: "post",
    response: ({ body }) => {
      const { userName, password } = body || {};
      if (userName === "admin" && password === "1") {
        return resultSuccess({
          token: "@guid",
          expireDate: dayjs().add(1, "d").format(),
        });
      } else {
        return resultError("Incorrect account or password");
      }
    },
  },
  {
    url: "/api/token/refresh",
    timeout: 100,
    method: "get",
    response: ({ body, headers }) => {
      return resultSuccess({
        token: "@guid",
        expireDate: dayjs().add(1, "d").format(),
      });
    },
  },
  {
    url: "/api/user/current",
    timeout: 100,
    method: "get",
    response: () => {
      return resultSuccess({
        id: "@guid",
        name: "@cname",
      });
    },
  },
] as MockMethod[];
