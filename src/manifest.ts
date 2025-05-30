import type { Manifest } from "webextension-polyfill";
import data from "../package.json";

export function manifest(isChrome = true) {
	const manifest: Manifest.WebExtensionManifest = {
		manifest_version: 3,
		name: "Skip",
		version: data.version,
		description: data.description,
		icons: {
			16: "icon16.png",
			48: "icon48.png",
			128: "icon128.png",
		},

		background: isChrome
			? {
					service_worker: "background.js",
				}
			: {
					scripts: ["background.js"],
					type: "module",
				},
		commands: {
			skip: {
				suggested_key: {
					default: "Ctrl+Right",
				},
				description: "Skip 85 Seconds",
			},
		},
		permissions: ["scripting", "activeTab"],

		browser_specific_settings: {
			gecko: {
				id: "skip@85",
			},
		},
	};

	return manifest;
}
