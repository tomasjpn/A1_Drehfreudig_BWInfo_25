import { fileManager } from "./fileManager.js";
import { checkDrehfreudig } from "./treeParser.js";
import { logger } from "./logger.js";
import { setTimeout } from "node:timers/promises";

logger.separator();
await logger.title("TOMAS PHAM");
await setTimeout(1000);
await logger.title("A1 - Drehfreudig BWInf 25");
await setTimeout(1000);

const fileContent = await fileManager();
if (!fileContent) {
  logger.info(
    "Nachdem die Testdateien hochgeladen wurden, starte das Programm erneut."
  );
  process.exit(1);
}

const result = checkDrehfreudig(fileContent);
(result.isDrehfreudig ? logger.success : logger.error)(result.resultMessage);
