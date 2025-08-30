module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allow much longer descriptive headers and remove body/footer line limits
    'header-max-length': [2, 'always', 300],
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
  },
};
