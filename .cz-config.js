/** Commitizen (cz-customizable): type + subject; skip body / breaking / footer. */
module.exports = {
  types: [
    { value: "feat", name: "feat:     A new feature" },
    { value: "fix", name: "fix:      A bug fix" },
    { value: "docs", name: "docs:     Documentation only changes" },
    {
      value: "style",
      name: "style:    Changes that do not affect the meaning of the code (formatting, whitespace, etc.)",
    },
    {
      value: "refactor",
      name: "refactor: A code change that neither fixes a bug nor adds a feature",
    },
    { value: "perf", name: "perf:     A code change that improves performance" },
    { value: "test", name: "test:     Adding or updating tests" },
    {
      value: "chore",
      name: "chore:    Build process or auxiliary tool and library changes",
    },
    { value: "revert", name: "revert:   Revert a previous commit" },
  ],

  scopes: [],
  allowCustomScopes: false,
  skipEmptyScopes: true,
  allowTicketNumber: false,

  skipQuestions: ["body", "breaking", "footer"],

  messages: {
    type: "Select the type of change that you're committing:",
    subject: "Write a short, imperative mood description of the change:\n",
    confirmCommit: "Are you sure you want to proceed with the commit above?",
  },

  subjectLimit: 100,
};
