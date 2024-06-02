import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: false,
    lib: {
      entry: "src/index.ts",
      name: "gennyFlow",
      fileName: (format) => `gennyflow.${format}.js`,
    },
    rollupOptions: {
      input: "src/index.ts",
      plugins: [
        {
          name: "wrap-in-iife",
          generateBundle(outputOptions, bundle) {
            Object.keys(bundle).forEach((fileName) => {
              const file = bundle[fileName];
              if (fileName.slice(-3) === ".js" && "code" in file) {
                file.code = `(() => {\n${file.code}})()`;
              }
            });
          },
        },
      ],
    },
  },
});
