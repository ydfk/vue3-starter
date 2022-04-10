/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-24 18:23:01
 * @LastEditors: ydfk
 * @LastEditTime: 2022-04-10 11:17:00
 */
module.exports = {
  root: true,
  extends: ["stylelint-config-standard-scss", "stylelint-config-recommended-vue/scss", "stylelint-config-recess-order", "stylelint-config-prettier"],
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
        ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "screen", "function", "if", "each", "include", "mixin"],
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
  },
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts"],
};
