module.exports = {
  extends: ['like', 'like/react'],

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['like/typescript'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 0,
      },
    },
  ],
}
