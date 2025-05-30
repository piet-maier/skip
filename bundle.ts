import { readdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { manifest } from "./src/manifest";

const distPath = resolve(import.meta.dir, "./dist");
const publicPath = resolve(import.meta.dir, "./public");

await rm(distPath, { force: true, recursive: true });

await Bun.write(
	resolve(distPath, "./manifest.json"),
	JSON.stringify(manifest(false), null, "\t"),
);

await Bun.build({
	entrypoints: [resolve(import.meta.dir, "./src/background.ts")],
	outdir: distPath,
	minify: true,
});

for (const file of await readdir(publicPath)) {
	await Bun.write(
		Bun.file(resolve(distPath, file)),
		Bun.file(resolve(publicPath, file)),
	);
}
