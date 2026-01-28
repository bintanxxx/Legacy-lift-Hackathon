// src/lib/constants.ts

export const REFACTOR_OPTIONS = [
  {
    id: "refactor",
    label: "🧹 Clean Up & Refactor",
    targets: [
      { value: "modular", label: "Modularize (Split Functions)" },
      { value: "readability", label: "Improve Readability & Naming" },
      { value: "error-handling", label: "Add Robust Error Handling" }
    ]
  },
  {
    id: "modernize",
    label: "✨ Modernize Syntax",
    targets: [
      { value: "js-async", label: "JS: Callback to Async/Await" },
      { value: "react-hooks", label: "React: Class to Hooks" },
      { value: "php-oop", label: "PHP: Native to OOP/Strict" }
    ]
  },
  {
    id: "migrate",
    label: "🚀 Migrate Language",
    targets: [
      { value: "typescript", label: "Convert to TypeScript" },
      { value: "go", label: "Convert to Go (Golang)" },
      { value: "python", label: "Convert to Python" }
    ]
  }
];