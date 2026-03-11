import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs/promises";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "strip-hls-source-map-comment",
          setup(build) {
            build.onLoad({ filter: /hls\.mjs$/ }, async ({ path }) => {
              const contents = await fs.readFile(path, "utf8");

              return {
                contents: contents.replace(/\n\/\/# sourceMappingURL=hls\.mjs\.map\s*$/, ""),
                loader: "js",
              };
            });
          },
        },
      ],
    },
  },
});
