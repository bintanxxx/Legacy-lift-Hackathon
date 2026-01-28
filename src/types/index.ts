// src/types/index.ts

export type RefactorTarget =
  | "modular"
  | "readability"
  | "error-handling" // Refactor
  | "js-async"
  | "react-hooks"
  | "php-oop" // Modernize
  | "typescript"
  | "go"
  | "python"; // Migrate

export interface RefactorRequest {
  code: string;
  mode: "refactor" | "modernize" | "migrate"; // ID dari refactorOptions
  target: RefactorTarget; // Value dari refactorOptions
}
