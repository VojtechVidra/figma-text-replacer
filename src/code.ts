import { name } from "faker";

const firstNameShortcode = "$fn";
const lastNameShortcode = "$ln";

figma.showUI(__html__);

figma.ui.onmessage = async (msg) => {
  switch (msg.type) {
    case "replace": {
      for (const node of figma.currentPage.selection) {
        if (node.type === "TEXT") {
          await setNodeText(node, msg.pattern);
        }
      }
    }
  }

  figma.closePlugin();
};

async function setNodeText(node: TextNode, pattern: string) {
  // @ts-ignore
  if (!node.fontName?.family) return;
  const fontName = node.fontName as FontName;

  await figma.loadFontAsync(fontName);
  node.deleteCharacters(0, node.characters.length);
  node.characters = await resolvePattern(node, pattern);
}

async function resolvePattern(
  node: TextNode,
  pattern: string
): Promise<string> {
  let result = pattern;

  result = result.replace(firstNameShortcode, name.firstName());
  result = result.replace(lastNameShortcode, name.lastName());

  return result;
}
