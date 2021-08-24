module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "package.json": ["prettier --write"],
  "*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
  "*.{scss,sass,less,styl,html}": ["stylelint --fix", "prettier --write"],
  "*.md": ["prettier --write"],
};
