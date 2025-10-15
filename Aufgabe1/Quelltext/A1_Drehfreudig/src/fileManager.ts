import { promises as fs } from "fs";

async function loadTestFiles() {
  try {
    const files = await fs.readdir("test");
    console.log("Dateien wurden erfolgreich geladen:", files);
  } catch (error) {
    console.error("Fehler beim Laden der Dateien:", error);
  }
}
