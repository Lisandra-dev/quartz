import { Root } from "hast"
import path from "path"

import { i18n } from "../../i18n"
import { htmlToJsx } from "../../util/jsx"
import { classNames } from "../../util/lang"
import { simplifySlug, stripSlashes } from "../../util/path"
import { PageList } from "../PageList"
import style from "../styles/listPage.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

interface FolderContentOptions {
  /**
   * Whether to display number of folders
   */
  showFolderCount: boolean
}

const defaultOptions: FolderContentOptions = {
  showFolderCount: true,
}

export default ((opts?: Partial<FolderContentOptions>) => {
  const options: FolderContentOptions = { ...defaultOptions, ...opts }

  const FolderContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { tree, fileData, allFiles, cfg } = props
    const folderSlug = stripSlashes(simplifySlug(fileData.slug!))
    const allPagesInFolder = allFiles.filter((file) => {
      const fileSlug = stripSlashes(simplifySlug(file.slug!))
      const prefixed = fileSlug.startsWith(folderSlug) && fileSlug !== folderSlug
      const folderParts = folderSlug.split(path.posix.sep)
      const fileParts = fileSlug.split(path.posix.sep)
      const isDirectChild = fileParts.length === folderParts.length + 1
      return prefixed && isDirectChild
    })
    const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
    const listProps = {
      ...props,
      allFiles: allPagesInFolder,
    }

    const content =
      (tree as Root).children.length === 0 ? undefined : htmlToJsx(fileData.filePath!, tree)
    const descFontmatter = fileData.frontmatter?.description
    const descContent = content ? content : descFontmatter
    return (
      <div class={classNames(undefined, "popover-hint", ...cssClasses)}>
        <article>
          <p>{descContent}</p>
        </article>
        {(!content || content?.props?.children?.length === 0) && (
          <div class="page-listing">
            {options.showFolderCount && (
              <p>
                {i18n(cfg.locale).pages.folderContent.itemsUnderFolder({
                  count: allPagesInFolder.length,
                })}
              </p>
            )}
            <div>
              <PageList {...listProps} />
            </div>
          </div>
        )}
      </div>
    )
  }

  FolderContent.css = style + PageList.css
  return FolderContent
}) satisfies QuartzComponentConstructor
