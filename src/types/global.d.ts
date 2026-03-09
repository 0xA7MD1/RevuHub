export {};

declare global {
  interface Window {
    slugMapping?: Record<string, string>;
  }
}
