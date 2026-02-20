import eslintPluginImport from 'eslint-plugin-import';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
      },
    },
    plugins: {
      import: eslintPluginImport,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js'],
        },
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-undef': 'error',
      eqeqeq: 'error',
      curly: 'error',
      'import/order': [
        'warn',
        { groups: [['builtin', 'external', 'internal']] },
      ],
      'import/no-unresolved': 'error',
    },
  },
];