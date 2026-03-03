import { project } from "@inlang/project"

export default project({
  settings: {
    "sourceLanguageTag": "en",
    "languageTags": ["en", "ar"],
    "modules": [
      "@inlang/message-lint-rule-empty-pattern",
      "@inlang/message-lint-rule-identical-pattern",
      "@inlang/message-lint-rule-missing-translation",
    ],
    "plugin.inlang.paraglideJs": {
      "path": "./src/paraglide",
    }
  }
})
