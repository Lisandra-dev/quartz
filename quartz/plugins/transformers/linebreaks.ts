import remarkBreaks from "remark-breaks";

import { QuartzTransformerPlugin } from "../types";

export const HardLineBreaks: QuartzTransformerPlugin = () => {
	return {
		name: "HardLineBreaks",
		markdownPlugins() {
			return [remarkBreaks];
		},
	};
};
