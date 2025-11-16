import { $ } from "bun";

async function main() {
    const branch = (await $`git branch --show-current`.text()).trim();
    const hash = (await $`git rev-parse --short HEAD`.text()).trim();
    const dirty = (await $`git status --porcelain`.text()).trim() && " dirty";

    Bun.stdout.write(`version: writing '${branch} ${hash}${dirty}' to /_version.txt`);
    await Bun.write("public/_version.txt", `${branch} ${hash}${dirty}`);
}

if (import.meta.main) await main();
