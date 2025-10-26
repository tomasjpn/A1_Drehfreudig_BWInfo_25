import chalk from "chalk";
import { fileManager } from "./fileManager.js";
import { checkDrehfreudig } from "./treeParser.js";

/* fileManager(); */

const fileContent = await fileManager();
if (!fileContent) {
  console.log("Kein Inhalt zum Verarbeiten gefunden.");
  process.exit(1);
}

const result = checkDrehfreudig(fileContent);
console.log(
  `→ ${
    result
      ? chalk.green(
          `Der ausgewählte Baum: ${fileContent} ist ${chalk.bold(
            "drehfreudig"
          )}`
        )
      : chalk.red(
          `Der ausgewählte Baum: ${fileContent} ist ${chalk.bold(
            "nicht drehfreudig"
          )}`
        )
  }`
);
