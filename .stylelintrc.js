module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-prettier', 'stylelint-scss'],
  rules: {
    'prettier/prettier': true,
    'max-nesting-depth': 3,
  },
  ignoreFiles: ['./node_modules/**/*.{css,scss,sass}', './public/**/*.{css,scss,sass}'],
};
