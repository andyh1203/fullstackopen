module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
  },
};
