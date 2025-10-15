import { promises as fs } from "fs";

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

loadTestFiles("../A1_Drehfreudig_Test_Daten");
