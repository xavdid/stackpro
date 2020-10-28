module.exports = {
  root: true,
  extends: "xavdid",
  parserOptions: { project: "./tsconfig.json" },
  rules: {
    // so I can void promises in hooks
    // did it on a single line instead
    // "no-void": ["error", { allowAsStatement: true }],
    "react/self-closing-comp": "error",
  },
};
