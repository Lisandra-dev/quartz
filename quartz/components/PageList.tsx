import { GlobalConfiguration } from "../cfg";
import { QuartzPluginData } from "../plugins/vfile";
import { FullSlug, resolveRelative, sluggify } from "../util/path";
import { Date, getDate } from "./Date";
import { QuartzComponent, QuartzComponentProps } from "./types";
import fs from 'fs';

export function byDateAndAlphabetical(
	cfg: GlobalConfiguration,
): (f1: QuartzPluginData, f2: QuartzPluginData) => number {
	return (f1, f2) => {
		if (f1.dates && f2.dates) {
			// sort descending
			return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime();
		} else if (f1.dates && !f2.dates) {
			// prioritize files with dates
			return -1;
		} else if (!f1.dates && f2.dates) {
			return 1;
		}

		// otherwise, sort lexographically by title
		const f1Title = f1.frontmatter?.title?.toLowerCase() ?? "";
		const f2Title = f2.frontmatter?.title?.toLowerCase() ?? "";
		return f1Title.localeCompare(f2Title);
	};
}

type Props = {
  limit?: number
} & QuartzComponentProps

export const PageList: QuartzComponent = ({ cfg, fileData, allFiles, limit }: Props) => {
	let list = allFiles.sort(byDateAndAlphabetical(cfg));
	if (limit) {
		list = list.slice(0, limit);
	}

	return (
		<ul class="section-ul">
			{list.map((page) => {
				let title = page.frontmatter?.title;
				if (title === "index") {
					const path = page.slug?.split("/");
					title = path?.[path.length - 2].replace("-", " ") ?? "index";
				}
				const tags = page.frontmatter?.tags ?? [];
				const description = page.frontmatter?.description;
				let image : string | undefined = page.frontmatter?.image as string ?? undefined ;
				if (cfg.ogImageDir) {
					image = `${cfg.ogImageDir}/${image}`
					image = resolveRelative(fileData.slug!, image as FullSlug);
					//check if image exists
					image = fs.existsSync(image) ? image : undefined;
				}
				return (
					<li class="section-li">
						<div class="section">
							{page.dates && (
								<p class="meta">
									<Date date={getDate(cfg, page)!} locale={cfg.locale} />
								</p>
							)}
							<div class="desc">
								<h3>
									<a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
										{title}
									</a>
								</h3>
								<div class="meta-container">
									<div>
										{image && (
											<img
												class="meta-image"
												src={sluggify(image)}
												width="100"
												height="100"
											/>
										)}
									</div>
									<p class="meta-desc">{description}</p>
								</div>								
							</div>
							<ul class="tags">
								{tags.map((tag) => (
									<li>
										<a
											class="internal tag-link"
											href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
										>
											{tag}
										</a>
									</li>
								))}
							</ul>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

PageList.css = `
.section h3 {
  margin: 0;
}

.section > .tags {
  margin: 0;
}
`;
