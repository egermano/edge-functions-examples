import { defineConfig } from "azion";

export default defineConfig({
  build: {
    entry: "src/main.ts",
    preset: 'typescript',
  },
});
