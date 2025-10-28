import chalk from "chalk";
import { fileManager } from "./fileManager.js";
import { checkDrehfreudig } from "./treeParser.js";
import { logger } from "./logger.js";
import { setTimeout } from "node:timers/promises";

/* fileManager(); */
logger.separator();
await logger.title("TOMAS PHAM");
/* await setTimeout(1500); */
await logger.title("A1 - Drehfreudig BWInf 25");

/* await setTimeout(2500); */

const fileContent = await fileManager();
if (!fileContent) {
  logger.info(
    "Nachdem die Testdateien hochgeladen wurden, starte das Programm erneut."
  );
  process.exit(1);
}

const result = checkDrehfreudig(fileContent);
logger.info(
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
