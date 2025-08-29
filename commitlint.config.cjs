module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allow slightly longer descriptive headers for multi-area chores
    'header-max-length': [2, 'always', 120],
  },
};
