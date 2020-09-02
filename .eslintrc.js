module.exports = {
  extends: ['like', 'like/react'],

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['like/typescript'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 0,
        'no-console': 1,
        'no-alert': 2,
        'no-debugger': 2,
        'no-unused-vars': 1,
      },
    },
  ],
}
