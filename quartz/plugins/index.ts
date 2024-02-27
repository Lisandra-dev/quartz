import { BuildCtx } from "../util/ctx";
import { FilePath, FullSlug } from "../util/path";
import { StaticResources } from "../util/resources";

export function getStaticResourcesFromPlugins(ctx: BuildCtx) {
	const staticResources: StaticResources = {
		css: [],
		js: [],
	};

	for (const transformer of ctx.cfg.plugins.transformers) {
		const res = transformer.externalResources ? transformer.externalResources(ctx) : {};
		if (res?.js) {
			staticResources.js.push(...res.js);
		}
		if (res?.css) {
			staticResources.css.push(...res.css);
		}
	}

	return staticResources;
}

export * from "./emitters";
export * from "./filters";
export * from "./transformers";

declare module "vfile" {
  // inserted in processors.ts
  interface DataMap {
    slug: FullSlug
    filePath: FilePath
    relativePath: FilePath
  }
}
