module.exports = {
  extends: ['like', 'like/react', 'plugin:import/errors', 'plugin:import/warnings'],

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
        camelcase: 0,
      },
    },
  ],
  settings: {
    'import/extensions': ['.ts', '.tsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
}
