module.exports = {
  extends: "google",
  rules: {
    "max-len": ["error", { "code": 120 }],
    "quotes": ["error", "double"],
    "arrow-parens": ["error", "as-needed"],
    "require-jsdoc": "off",
    "valid-jsdoc": "off"
  },
  env: {
    "node": true,
    "es6": true
  }
};