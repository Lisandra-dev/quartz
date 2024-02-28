import { i18n } from "../i18n";
import { classNames } from "../util/lang";
import { pathToRoot } from "../util/path";
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types";

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
	const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title;
	const baseDir = pathToRoot(fileData.slug!);
	return (
		<h1 class={classNames(displayClass, "page-title")}>
			<a href={baseDir}>{title}</a>
		</h1>
	);
};

PageTitle.css = `
.page-title {
  margin: 0;
}
`;

export default (() => PageTitle) satisfies QuartzComponentConstructor;