/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
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
  },
  overrides: [
    {
      files: ['**/src/**/*.spec.{j,t}s?(x)'],
      globals: {
        describe: false,
        it: false,
        expect: false,
        afterAll: false
      }
    }
  ]
}
