import chalk from "chalk";
import fs from "fs";

import DepGraph from "../../depgraph";
import { FilePath, joinSegments } from "../../util/path";
import { QuartzEmitterPlugin } from "../types";

export function extractDomainFromBaseUrl(baseUrl: string) {
	const url = new URL(`https://${baseUrl}`);
	return url.hostname;
}

export const CNAME: QuartzEmitterPlugin = () => ({
	name: "CNAME",
	getQuartzComponents() {
		return [];
	},
	async getDependencyGraph(_ctx, _content, _resources) {
		return new DepGraph<FilePath>();
	},
	async emit({ argv, cfg }, _content, _resources): Promise<FilePath[]> {
		if (!cfg.configuration.baseUrl) {
			console.warn(chalk.yellow("CNAME emitter requires `baseUrl` to be set in your configuration"));
			return [];
		}
		const path = joinSegments(argv.output, "CNAME");
		const content = extractDomainFromBaseUrl(cfg.configuration.baseUrl);
		if (!content) {
			return [];
		}
		fs.writeFileSync(path, content);
		return [path] as FilePath[];
	},
});
