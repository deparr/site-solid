import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
    ssr: true,
    server: {
        preset: "static",
        prerender: {
            // this seems to work
            autoSubfolderIndex: false,
            routes: ["/404"]
        },
    }
});
