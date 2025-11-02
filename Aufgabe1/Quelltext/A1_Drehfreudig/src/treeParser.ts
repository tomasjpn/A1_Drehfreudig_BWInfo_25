import { logger } from "./logger.js";

type Node = {
  children: Node[];
  l?: number;
  r?: number;
  parent?: Node | null;
};

function parseTree(treeString: string, currentPos = 0): [Node, number] {
  if (treeString[currentPos] !== "(")
    throw new Error(`Erwarte '(' an Position ${currentPos}`);

  const node: Node = { children: [], parent: null };
  currentPos++;

  while (treeString[currentPos] === "(") {
    const [child, newPos] = parseTree(treeString, currentPos);
    child.parent = node;
    node.children.push(child);
    currentPos = newPos;
  }
  if (treeString[currentPos] !== ")")
    throw new Error(`Erwarte ')' an Position ${currentPos}`);
  currentPos++;
  return [node, currentPos];
}

function assignIntervals(node: Node, start = 1): number {
  if (node.children.length === 0) {
    node.l = start;
    node.r = start;
    return start + 1;
  }
  let currentCount = start;
  for (const child of node.children) {
    currentCount = assignIntervals(child, currentCount);
  }
  node.l = start;
  node.r = currentCount - 1;
  return currentCount;
}

function calcWidth(node: Node): number {
  if (node.l === undefined || node.r === undefined)
    throw new Error("Intervall nicht gesetzt");
  return node.r - node.l + 1;
}

function checkPalindrome(intervalWidths: number[]): boolean {
  let i = 0;
  let j = intervalWidths.length - 1;
  while (i < j) {
    if (intervalWidths[i] !== intervalWidths[j]) return false;
    i++;
    j--;
  }
  return true;
}

//--------------------------------------------------------------------------------//

export function checkDrehfreudig(treeString: string): {
  resultMessage: string;
  isDrehfreudig: boolean;
} {
  logger.info("Überprüfe den Baum auf Drehfreudigkeit...");
  logger.info("Parse den Baum aus der Eingabe...");
  const [root, pos] = parseTree(treeString, 0);
  if (pos !== treeString.length) {
    throw new Error("Ungültige Eingabe: Überzählige Zeichen am Ende");
  }

  logger.success("... Baum erfolgreich geparst.");
  logger.info("Weise jedem Knoten Intervalle zu...");

  assignIntervals(root, 1);
  logger.success("... Intervalle erfolgreich zugewiesen.");

  function checkNode(currentNode: Node): boolean {
    if (currentNode.children.length === 0) return true;
    const childWidths = currentNode.children.map(calcWidth);
    if (!checkPalindrome(childWidths)) return false;
    for (const child of currentNode.children) {
      if (!checkNode(child)) return false;
    }
    return true;
  }

  logger.info("... Drehfreudigkeitsprüfung abgeschlossen.");

  const isDrehfreudig = checkNode(root);
  let resultMessage = `Der ausgewählte Baum: ${treeString} ist `;

  if (isDrehfreudig) {
    resultMessage += "→ drehfreudig";
  } else {
    resultMessage += "→ nicht drehfreudig";
  }

  return { resultMessage, isDrehfreudig };
}
