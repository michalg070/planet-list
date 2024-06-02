/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:vitest/recommended'
  ],
  rules: {
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['List']
      }
    ]
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
