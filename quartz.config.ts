import { QuartzConfig } from "./quartz/cfg";
import * as Plugin from "./quartz/plugins";

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
	configuration: {
		pageTitle: "🦉 Owlly Lab",
		enableSPA: true,
		locale: "fr-FR",
		enablePopovers: true,
		analytics: {
			provider: "plausible",
		},
		baseUrl: "www.mara-li.fr",
		ogImageDir: "_assets/img",
		ignorePatterns: ["private", "templates", ".obsidian"],
		defaultDateType: "modified",
		theme: {
			cdnCaching: true,
			typography: {
				header: "Karla",
				body: "IBM Plex Sans",
				code: "Ubuntu Mono",
			},
			colors: {
				lightMode: {
					light: "#f5f2e9",
					lightgray: "#e0dcd3",
					gray: "#b8b8b8",
					darkgray: "#4e4e4e",
					dark: "#2b2b2b",
					secondary: "#384b73",
					tertiary: "#84a59d",
					highlight: "rgba(143, 159, 169, 0.15)",
				},
				darkMode: {
					light: "#1a1915",
					lightgray: "#393639",
					gray: "#646464",
					darkgray: "#d4d4d4",
					dark: "#ebebec",
					secondary: "#5d7da5",
					tertiary: "#84a59d",
					highlight: "rgba(143, 159, 169, 0.15)",
				},
			},
		},
	},
	plugins: {
		transformers: [
			Plugin.FrontMatter(),
			Plugin.CreatedModifiedDate({
				priority: ["frontmatter", "git", "filesystem"],
			}),
			Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
			Plugin.Latex({ renderEngine: "katex" }),
			Plugin.SyntaxHighlighting({
				theme: {
					light: "github-light",
					dark: "github-dark",
				},
				keepBackground: false,
			}),
			Plugin.GitHubFlavoredMarkdown(),
			Plugin.TableOfContents(),
			Plugin.CrawlLinks({ markdownLinkResolution: "relative" }),
			Plugin.Description(),
			Plugin.HardLineBreaks(),
		],
		filters: [Plugin.RemoveDrafts()],
		emitters: [
			Plugin.AliasRedirects(),
			Plugin.ComponentResources({ fontOrigin: "googleFonts" }),
			Plugin.ContentPage(),
			Plugin.FolderPage(),
			Plugin.TagPage(),
			Plugin.ContentIndex({
				enableSiteMap: true,
				enableRSS: true,
			}),
			Plugin.Assets(),
			Plugin.Static(),
			Plugin.NotFoundPage(),
		],
	},
};

export default config;
