import { $ } from "bun";

async function main() {
    const branch = (await $`git branch --show-current`.text()).trim();
    const hash = (await $`git rev-parse --short HEAD`.text()).trim();
    const dirty = (await $`git status --porcelain`.text()).trim() && " dirty";
    const datetime = new Date().toUTCString();

    Bun.stdout.write(`version: writing '${branch} ${hash}${dirty} ${datetime}' to /_version.txt`);
    await Bun.write("public/_version.txt", `${branch} ${hash}${dirty}\n${datetime}`);
}

if (import.meta.main) await main();
