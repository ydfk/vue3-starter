/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-25 10:19:43
 * @LastEditors: ydfk
 * @LastEditTime: 2022-04-09 18:46:30
 */
module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "package.json": ["prettier --write"],
  "*.vue": ["eslint --fix", "prettier --write"],
  "*.{scss,sass,less,styl,html}": ["stylelint --fix", "prettier --write"],
};
