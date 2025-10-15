import { promises as fs } from "fs";
import chalk from "chalk";

async function loadTestFiles(folderPath: string) {
  try {
    const files = await fs.readdir(folderPath);
    console.log("Dateien wurden erfolgreich geladen:", files);
  } catch (error) {
    console.error("Fehler beim Laden der Dateien:", error);
  }
}

async function readTestFiles(filePath: string) {
  try {
    const fileContent = await fs.readFile(`test/${filePath}`, "utf-8");
    console.log("Inhalt der Testdatei:", fileContent);
    return fileContent.trim();
  } catch (error) {
    console.error("Fehler beim Lesen der Testdatei:", error);
  }
}

/* loadTestFiles("../A1_Drehfreudig_Test_Daten"); */
/* readTestFiles("../../A1_Drehfreudig_Test_Daten/drehfreudig01.txt"); */

async function main() {
  const testFolderPath = "../A1_Drehfreudig_Test_Daten";

  try {
    console.log(
      `Versuche, auf den Ordner mit den Testdateien: ${chalk.italic.underline.cyan(
        testFolderPath
      )} zuzugreifen ...`
    );
    await fs.access(testFolderPath);
    console.log(chalk.green("... Zugriff auf den Ordner erfolgreich!"));
  } catch (error) {
    console.error("... Zugriff auf den Ordner fehlgeschlagen:", error);
  }
}

main();
