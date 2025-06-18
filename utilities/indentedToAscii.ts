import { TreeNode } from "@/models/TreeNode";

export function indentedToAscii(text: string): string {
  if (!text.trim()) return "";

  const lines = text.split("\n").filter((line) => line.trim());
  const nodes: TreeNode[] = [];

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    // Count leading tabs
    const level = line.length - line.replace(/^\t*/, "").length;
    nodes.push({
      name: trimmed,
      level,
      children: [],
    });
  });

  const buildTree = (startIndex: number, parentLevel: number): TreeNode[] => {
    const result: TreeNode[] = [];
    let i = startIndex;
    while (i < nodes.length && nodes[i].level > parentLevel) {
      if (nodes[i].level === parentLevel + 1) {
        const node = nodes[i];
        result.push(node);
        i++;
        const childStartIndex = i;
        while (i < nodes.length && nodes[i].level > node.level) {
          i++;
        }
        if (childStartIndex < i) {
          node.children = buildTree(childStartIndex, node.level);
        }
      } else {
        i++;
      }
    }
    return result;
  };

  const tree = buildTree(0, -1);

  const generateAscii = (nodes: TreeNode[], prefix = "", isRoot = true): string => {
    let result = "";
    if (isRoot && nodes.length > 0) {
      result += ".\n";
    }
    nodes.forEach((node, index) => {
      const isLast = index === nodes.length - 1;
      const currentPrefix = isRoot ? "" : prefix;
      const connector = isLast ? "└── " : "├── ";
      const folderSuffix = node.children.length > 0 ? "/" : "";
      result += currentPrefix + connector + node.name + folderSuffix + "\n";
      if (node.children.length > 0) {
        const childPrefix = currentPrefix + (isLast ? "    " : "│   ");
        result += generateAscii(node.children, childPrefix, false);
      }
    });
    return result;
  };

  return generateAscii(tree).trim();
}
