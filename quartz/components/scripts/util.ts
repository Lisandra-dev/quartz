import { Data } from "vfile";

import { GlobalConfiguration } from "../../cfg";
import { sluggify } from "../../util/path";

export function registerEscapeHandler(outsideContainer: HTMLElement | null, cb: () => void) {
	if (!outsideContainer) return;
	function click(this: HTMLElement, e: HTMLElementEventMap["click"]) {
		if (e.target !== this) return;
		e.preventDefault();
		cb();
	}

	function esc(e: HTMLElementEventMap["keydown"]) {
		if (!e.key.startsWith("Esc")) return;
		e.preventDefault();
		cb();
	}

	outsideContainer?.addEventListener("click", click);
	window.addCleanup(() => outsideContainer?.removeEventListener("click", click));
	document.addEventListener("keydown", esc);
	window.addCleanup(() => document.removeEventListener("keydown", esc));
}

export function removeAllChildren(node: HTMLElement) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}

export function getMetaImage(cfg: GlobalConfiguration, fileData: Data) {
	const ogImagePath = `https://${cfg.baseUrl}/static/og-image.png`;
	if (cfg.ogImageDir) {
		const contentDir = `https://${cfg.baseUrl}/${cfg.ogImageDir}/`;
		return fileData?.frontmatter?.image
			? sluggify(`${contentDir}${(fileData.frontmatter.image as string).trim()}`)
			: `https://${cfg.baseUrl}/static/og-image.png`;
	}
	return ogImagePath;
}