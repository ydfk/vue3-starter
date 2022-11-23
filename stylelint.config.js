/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-24 18:23:01
 * @LastEditors: ydfk
 * @LastEditTime: 2022-06-23 17:39:30
 */
module.exports = {
  root: true,
  //plugins: ["stylelint-order"],
  extends: ["stylelint-config-standard-scss", "stylelint-config-recommended-vue/scss", "stylelint-config-recess-order", "stylelint-config-prettier"],
  customSyntax: "postcss-html",
  rules: {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["deep", "global"],
      },
    ],
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep", "v-global", "v-slotted"],
      },
    ],
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "screen", "function", "if", "each", "include", "mixin", "extend"],
      },
    ],
    "no-empty-source": null,
    "named-grid-areas-no-invalid": null,
    "unicode-bom": "never",
    "no-descending-specificity": null,
    "font-family-no-missing-generic-family-keyword": null,
    "declaration-colon-space-after": "always-single-line",
    "declaration-colon-space-before": "never",
    // 'declaration-block-trailing-semicolon': 'always',
    "rule-empty-line-before": [
      "always",
      {
        ignore: ["after-comment", "first-nested"],
      },
    ],
    "unit-no-unknown": [true, { ignoreUnits: ["rpx"] }],
    "scss/at-import-partial-extension": "always",
    "scss/percent-placeholder-pattern": null,
    "selector-class-pattern": null,
  },
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts"],
};
