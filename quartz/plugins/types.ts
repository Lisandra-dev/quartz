import { PluggableList } from "unified";

import { QuartzComponent } from "../components/types";
import DepGraph from "../depgraph";
import { BuildCtx } from "../util/ctx";
import { FilePath } from "../util/path";
import { StaticResources } from "../util/resources";
import { ProcessedContent } from "./vfile";

export interface PluginTypes {
  transformers: QuartzTransformerPluginInstance[]
  filters: QuartzFilterPluginInstance[]
  emitters: QuartzEmitterPluginInstance[]
}

type OptionType = object | undefined
export type QuartzTransformerPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => QuartzTransformerPluginInstance
export type QuartzTransformerPluginInstance = {
  name: string
  textTransform?: (ctx: BuildCtx, src: string | Buffer) => string | Buffer
  markdownPlugins?: (ctx: BuildCtx) => PluggableList
  htmlPlugins?: (ctx: BuildCtx) => PluggableList
  externalResources?: (ctx: BuildCtx) => Partial<StaticResources>
}

export type QuartzFilterPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => QuartzFilterPluginInstance
export type QuartzFilterPluginInstance = {
  name: string
  shouldPublish(ctx: BuildCtx, content: ProcessedContent): boolean
}

export type QuartzEmitterPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => QuartzEmitterPluginInstance
export type QuartzEmitterPluginInstance = {
  name: string
  emit(ctx: BuildCtx, content: ProcessedContent[], resources: StaticResources): Promise<FilePath[]>
  getQuartzComponents(ctx: BuildCtx): QuartzComponent[]
  getDependencyGraph?(
    ctx: BuildCtx,
    content: ProcessedContent[],
    resources: StaticResources,
  ): Promise<DepGraph<FilePath>>
}
