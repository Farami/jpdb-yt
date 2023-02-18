import packageJson from "./package.json";

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV3 = {
	manifest_version: 3,
	name: packageJson.name,
	version: packageJson.version,
	description: packageJson.description,
	background: { service_worker: "src/pages/background/index.js" },
	permissions: ["storage"],
	action: {
		default_popup: "src/pages/popup/index.html",
		default_icon: "icon-34.png",
	},
	icons: {
		"128": "icon-128.png",
	},
	content_scripts: [
		{
			matches: ["*://*.youtube.com/*"],
			js: ["src/pages/content/index.js"],
			css: ["assets/css/contentStyle.chunk.css"],
		},
	],
	web_accessible_resources: [
		{
			resources: [
				"assets/js/*.js",
				"assets/css/*.css",
				"icon-128.png",
				"icon-34.png",
			],
			matches: ["*://*/*"],
		},
	],
};

export default manifest;
