/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-24 17:24:45
 * @LastEditors: ydfk
 * @LastEditTime: 2022-07-07 16:20:37
 */
import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./routers";
import { setupStore } from "@/stores/index";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import IsSameOrAfter from "dayjs/plugin/isSameOrAfter";
import IsSameOrBefore from "dayjs/plugin/isSameOrBefore";
import IsBetween from "dayjs/plugin/isBetween";
import ObjectSupport from "dayjs/plugin/objectSupport";
import Duration from "dayjs/plugin/duration";
import "dayjs/locale/zh-cn";

import "virtual:windi.css";
import "virtual:windi-devtools";

import "ant-design-vue/es/message/style/css";
import { AntDesignIcon } from "@/plugins/icon";

import "v-calendar/dist/style.css";
import VCalendar from "v-calendar";

import { use } from "echarts/core";
import ECharts from "vue-echarts";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import { TooltipComponent, TitleComponent, PolarComponent } from "echarts/components";

dayjs.locale("zh-cn");
dayjs.extend(timezone);
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);
dayjs.extend(IsBetween);
dayjs.extend(ObjectSupport);
dayjs.extend(Duration);
dayjs.tz.setDefault("Asia/Shanghai");

const bootstrap = () => {
  use([CanvasRenderer, TooltipComponent, TitleComponent, PolarComponent, BarChart]);

  const app = createApp(App);
  setupRouter(app);
  setupStore(app);

  app.use(AntDesignIcon);
  app.use(VCalendar, {
    locale: "zh-cn",
  });

  app.component("VChart", ECharts);

  app.mount("#app");
};

bootstrap();
