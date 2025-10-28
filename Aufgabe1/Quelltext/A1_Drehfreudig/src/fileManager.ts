import { promises as fs } from "fs";
import chalk from "chalk";
import prompts from "prompts";
import { logger } from "./logger.js";
import { teen } from "gradient-string";

async function loadTestFiles(
  folderPath: string
): Promise<string[] | undefined> {
  logger.separator();
  try {
    logger.info(
      `Versuche die Dateien im Ordner: ${chalk.italic.underline.bold.cyan(
        folderPath
      )},  zu laden ...`
    );
    const files = await fs.readdir(folderPath);
    logger.info("... Dateien wurden erfolgreich geladen:", files);
    return files;
  } catch (error) {
    logger.error("... Fehler beim Laden der Dateien:", error);
    return undefined;
  }
}

async function readTestFiles(filePath: string) {
  logger.separator();
  try {
    logger.info(
      `Versuche den Inhalt der Testdatei: ${chalk.italic.underline.bold.cyan(
        filePath
      )}, zu lesen ...`
    );
    const fileContent = await fs.readFile(
      `../A1_Drehfreudig_Test_Daten/${filePath}`,
      "utf-8"
    );
    logger.success("... Inhalt der Testdatei erfolgreich geladen");
    logger.info("Inhalt der Testdatei:", teen(fileContent));
    return fileContent.trim();
  } catch (error) {
    logger.error("... Fehler beim Lesen der Testdatei:", error);
  }
}

//--------------------------------------------------------------------------------//

export async function fileManager() {
  const testFolderPath = "../A1_Drehfreudig_Test_Daten";
  logger.separator();
  try {
    logger.info(
      `Versuche, auf den Ordner mit den Testdateien: { ${chalk.italic.underline.bold.cyan(
        testFolderPath
      )} }  zuzugreifen ...`
    );
    await fs.access(testFolderPath);
    logger.success("... Zugriff auf den Ordner erfolgreich!");
    /*   console.log(chalk.green("... Zugriff auf den Ordner erfolgreich!")); */
  } catch (error) {
    logger.error("... Zugriff auf den Ordner fehlgeschlagen:", error);
  }

  const testFiles = await loadTestFiles(testFolderPath);
  if (testFiles && testFiles.length === 0) {
    logger.error("... Ordner beinhaltet keine Testdateien.");
    return;
  }

  if (testFiles) {
    for (const testFile of testFiles) {
      const fileContent = await readTestFiles(testFile);
    }
    logger.separator();
    const userResponse = await prompts({
      type: "select",
      name: "testFile",
      message: "Welche Testdatei möchtest du ausführen?",
      choices: testFiles.map((testFile) => ({
        title: testFile,
        value: testFile,
      })),
      initial: 0,
    });
    logger.info(
      "Folgende Testdatei wurde ausgewählt:",
      chalk.italic.underline.bold.cyan(userResponse.testFile)
    );

    if (!userResponse.testFile) {
      logger.error(
        chalk.red("Keine Testdatei ausgewählt. Vorgang abgebrochen.")
      );
      return;
    }

    const selectedFilePath = `${testFolderPath}/${userResponse.testFile}`;
    logger.info(
      "Dateipfad der ausgewählten Testdatei:",
      chalk.italic.underline.bold.cyan(selectedFilePath)
    );

    const fileContent = await readTestFiles(userResponse.testFile);
    if (!fileContent) {
      logger.error("Kein Inhalt in der Datei gefunden.");
      return;
    }
    logger.separator();
    return fileContent;
  }
}

/* fileManager(); */
