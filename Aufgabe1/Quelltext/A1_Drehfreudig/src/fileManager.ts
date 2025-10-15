import { promises as fs } from "fs";
import chalk from "chalk";
import prompts from "prompts";

async function loadTestFiles(
  folderPath: string
): Promise<string[] | undefined> {
  try {
    console.log(
      `Versuche die Dateien im Ordner: ${chalk.italic.underline.bold.cyan(
        folderPath
      )},  zu laden ...`
    );
    const files = await fs.readdir(folderPath);
    console.log("... Dateien wurden erfolgreich geladen:", files);
    return files;
  } catch (error) {
    console.error("... Fehler beim Laden der Dateien:", error);
    return undefined;
  }
}

async function readTestFiles(filePath: string) {
  try {
    console.log(
      `Versuche den Inhalt der Testdatei: ${chalk.italic.underline.bold.cyan(
        filePath
      )}, zu lesen ...`
    );
    const fileContent = await fs.readFile(
      `../A1_Drehfreudig_Test_Daten/${filePath}`,
      "utf-8"
    );
    console.log("... Inhalt der Testdatei erfolgreich geladen");
    console.log("Inhalt der Testdatei:", chalk.green(fileContent));
    return fileContent.trim();
  } catch (error) {
    console.error("... Fehler beim Lesen der Testdatei:", error);
  }
}

/* loadTestFiles("../A1_Drehfreudig_Test_Daten"); */
/* readTestFiles("../../A1_Drehfreudig_Test_Daten/drehfreudig01.txt"); */

export async function fileManager() {
  const testFolderPath = "../A1_Drehfreudig_Test_Daten";

  try {
    console.log(
      `Versuche, auf den Ordner mit den Testdateien: { ${chalk.italic.underline.bold.cyan(
        testFolderPath
      )} }  zuzugreifen ...`
    );
    await fs.access(testFolderPath);
    console.log(chalk.green("... Zugriff auf den Ordner erfolgreich!"));
  } catch (error) {
    console.error("... Zugriff auf den Ordner fehlgeschlagen:", error);
  }

  const testFiles = await loadTestFiles(testFolderPath);
  if (testFiles && testFiles.length === 0) {
    console.log(chalk.red("... Ordner beinhaltet keine Testdateien."));
    return;
  }

  if (testFiles) {
    for (const testFile of testFiles) {
      const fileContent = await readTestFiles(testFile);
    }
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
    console.log(
      "Folgende Testdatei wurde ausgewählt:",
      chalk.italic.underline.bold.cyan(userResponse.testFile)
    );

    if (!userResponse.testFile) {
      console.log(
        chalk.red("Keine Testdatei ausgewählt. Vorgang abgebrochen.")
      );
      return;
    }
  }
}

/* fileManager(); */
