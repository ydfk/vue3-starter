<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-24 17:24:45
 * @LastEditors: ydfk
 * @LastEditTime: 2024-03-04 09:36:58
-->

# 介绍

一个快速启动项目的基本框架 使用Vue 3 + Typescript + Vite

使用 [vue3.4](https://cn.vuejs.org/guide/introduction.html) 和 Typescript 使用 vite5 打包编译

包括了 [vue-router](https://router.vuejs.org/zh/) 和 [pinia](https://pinia.vuejs.org/zh/)

包括了 mock prettier eslint stylelint 等工具的基本配置

css使用[unoCss](https://unocss.nodejs.cn/)

使用了 ui 组件 [Ant Design Vue v4](https://www.antdv.com/components/overview-cn) 并且引入按需加载 无需再导入

同时包含[vueuse](https://www.vueusejs.com/) [lodash](https://www.lodashjs.com/) [dayjs](https://dayjs.gitee.io/docs/zh-CN/installation/installation)

推荐使用包管理工具 [pnpm](https://pnpm.io/)

推荐使用[volta](https://volta.sh/)管理nodejs

推荐使用[visual studio code](https://code.visualstudio.com/)进行开发

推荐安装`.vscode`文件夹中的`extensions`的扩展(注意打开vscode时候的提示可以一件安装)

重点扩展`unocss` `volar(vue office)` `prettier` `eslint` `stylelint`

# 主要文件夹解释

- `apis`所有请求api的方法封装
- `assets`主要是图片 svg icon 等资源文件
- `commons\models` 是使用ts定义的会使用的模型
- `commons\const.ts` 是使用ts定义的常量
- `components`中是封装的一些与业务无关的组件 主要是对antdv的二次封装 使用`unplugin-vue-components`自动导入 可直接使用不用`import`
- `componentsBusiness` 中是封装的一些与业务有关的组件 使用`unplugin-vue-components`自动导入 可直接使用不用`import`
- `enums` 中是使用`ts`定义的枚举 例如路由名称等
- `hooks` 中是封装的一些简单的`hooks` 项目也引入了[vueuse](https://www.vueusejs.com/)

  比较重要的`hooks`是`useMitt` [了解事件总线](https://juejin.cn/post/6973106775755063333)

- `plugins` 中是一些插件 和 自定义指令等
- `routers` 中定义了路由 [vue-router](https://router.vuejs.org/zh/)
- `stores` 是状态管理 [vue状态管理](https://cn.vuejs.org/guide/scaling-up/state-management.html) [pinia](https://pinia.vuejs.org/zh/)

- `styles` 中是样式文件 [了解scss](https://www.sass.hk/docs/) 这些文件已经使用vite全局导入
  - `antFix.scss`是对antdv样式的复写
  - `global.scss`中是一些通用的全局可使用的样式 也可以使用 [tailwindcss](https://tailwindcss.com/) [unoCss](https://unocss.nodejs.cn/)
  - `var.scss`是一些定义的scss变量
- `utils` 中是一些插件的封装 例如`axios` `number`等
- `views` 中是主要业务代码存放的位置

# 一些规范

- vue组件命名使用大驼峰 其他文件命名使用小驼峰

- [typescript编码规范](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/wiki/coding_guidelines.html)

- [vue3风格指南](https://juejin.cn/post/7224426218929176637)

# 学习路径

- html javascript css

- [nodejs](https://juejin.cn/post/6939556120956502053)

- [volta](https://volta.sh/)

- [typeScript](https://ts.xcatliu.com/)

- [vue3](https://cn.vuejs.org/guide/introduction.html)

- [vue-router](https://router.vuejs.org/zh/)

- [pinia](https://pinia.vuejs.org/zh/)

- [事件总线mitt](https://juejin.cn/post/6973106775755063333)

- [scss](https://www.sass.hk/docs/)

- [tailwindcss](https://tailwindcss.com/)

- [unoCss](https://unocss.nodejs.cn/)

- [Ant Design Vue](https://www.antdv.com/components/overview-cn)

# 其他

- 推荐使用git
- 代码使用git提交时候会自动进行lint检查(eslint stylelint vue-tsc)，如果失败不能提交

  可以手动执行`pnpm lint` 进行提前判断

- 推荐使用vscode的时候保存后自动使用`prettier`进行格式化[vscode如何配置prettier在保存时候自动格式化](https://blog.csdn.net/qq_37815596/article/details/109225879)

- 建议使用`pnpm cz`进行代码提交[commitlint介绍](https://juejin.cn/post/7068988460899500040)
