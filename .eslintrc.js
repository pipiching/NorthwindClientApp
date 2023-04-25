module.exports = {
  parserOptions: {
    // set to 3, 5 (default), 6, 7 (2016), 8 (2017), 9 (2018), 10 (2019), 11 (2020), or 12 (2021) to specify the version of ECMAScript syntax you want to use.
    ecmaVersion: 2019,
    // set to "script" (default) or "module" if your code is in ECMAScript modules.
    sourceType: 'module',
    // an object indicating which additional language features you'd like to use.
    ecmaFeatures: {
      jsx: true, // enable JSX
    },
  },
  settings: {
    react: {
      pragma: 'React', // Pragma to use, default to "React"
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    // eslint
    'max-len': ['error', { code: 120, ignoreComments: true }],
    'newline-per-array-elements': 0,
    'array-element-newline': 0,

    // prettier
    'prettier/prettier': ['error', { endOfLine: 'off', printWidth: 'off' }],
  },
};
