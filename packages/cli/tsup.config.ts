import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src"],
  //   dts: true,
  format: ["cjs"],
  outDir: "dist",
});
