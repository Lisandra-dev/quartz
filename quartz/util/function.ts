import { secretPage } from "../../quartz.layout";
import { FileNode, Options } from "../components/ExplorerNode"

export const sortFn: Options["sortFn"] = (a: FileNode, b: FileNode) => {
	if (a.order && b.order) {
		return a.order - b.order;
	} else if (a.order) {
		return -1;
	}
	return 1;
};


export const filterFn = (node: FileNode) => {
	return !secretPage.has(node.name)
}