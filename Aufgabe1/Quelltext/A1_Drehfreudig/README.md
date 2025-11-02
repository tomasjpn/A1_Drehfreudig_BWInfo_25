Anleitung zum Ausführen des Projekts

1. Projektabhängigkeiten installieren
   Im Projektverzeichnis öffnet man die Konsole und führt einen der beiden Befehle aus, je nachdem, ob bereits eine package-lock.json vorhanden ist:

- Wenn package-lock.json vorhanden ist:
  o npm ci
  Grund: npm ci installiert exakt die Versionen der Pakete, die in der package-lock.json festgehalten sind. Dies sorgt für reproduzierbare Builds.
- Wenn package-lock.json fehlt:
  o npm i
  Grund: npm i (oder npm install) erstellt eine neue package-lock.json und installiert die aktuellen Versionen der Abhängigkeiten.

2. Projektverzeichnis
   Navigiere in das Projektverzeichnis,:
   C:\Users\<Benutzer>\development\A1_Drehfreudig_BWInfo_25\Aufgabe1\Quelltext\A1_Drehfreudig
   Hinweis: <Benutzer> sollte durch deinen Windows-Benutzernamen ersetzt werden. Alternativ kannst du den Pfad universell über den Projektspeicherort definieren, z. B. ./ wenn du bereits im Projektordner bist.

3. Projekt starten
   Im Projektverzeichnis führst man folgendes aus: npm start
   Was passiert dabei:
   o TypeScript-Dateien (.ts) werden automatisch in JavaScript (.js) ins dist-Verzeichnis kompiliert.
   o Anschließend wird die Hauptdatei index.js aus dem dist-Ordner in der Konsole ausgeführt.
   o Die Konsole zeigt die Ausgaben des Programms an.
