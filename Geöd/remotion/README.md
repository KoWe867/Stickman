# GELDAKTE – Remotion-Produktionsprojekt

Rendert die GELDAKTE-Folgen als 1080×1920 / 30 fps Hochformat-Videos.

## Was hier drin ist

| Pfad | Inhalt |
|---|---|
| `src/theme/tokens.ts` | Farb-, Typo- und Formattokens aus `referenzen/STILANALYSE.md` |
| `src/lib/shots.ts` | Shot-Typ, Timing-Helfer und Regelprüfung |
| `src/components/` | Szene mit Kamerafahrt, Caption, Betrag, Auftakt, Abbinder |
| `src/episodes/akte-001/` | Shotliste und Komposition der Pilotfolge |
| `public/akte-001/` | Bilddateien der Folge |

Die Folgen sind datengetrieben: `shots.ts` beschreibt jeden Shot mit Bild,
Caption, Sprechertext, Dauer und Kamerafahrt. Die Komposition setzt daraus die
Sequenzen zusammen und berechnet die Gesamtlänge selbst. Arbeitsplatz B liefert
also die Shotliste, Arbeitsplatz C legt nur noch die Bilder in `public/`.

## Befehle

```bash
npm install
npm start                 # Remotion Studio zur Vorschau
npm run typecheck
npm run render:akte-001   # Master nach out/AKTE-001.mp4
```

### Rendern in dieser Umgebung

Remotion lädt sonst ein eigenes Chrome herunter; der Host `remotion.media`
steht hier nicht auf der Netzwerk-Allowlist. Deshalb das vorinstallierte
Chromium mitgeben:

```bash
npx remotion render Akte001 out/AKTE-001.mp4 \
  --browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
```

## Eingebaute Regelprüfung

`pruefeShots()` läuft beim Laden der Kompositionen und warnt in der Konsole,
wenn eine Shotliste gegen die Vorgaben verstösst:

- kein Bild länger als 7 Sekunden unverändert;
- Captions mit maximal 5 Wörtern.

Das ersetzt keine QA, verhindert aber, dass solche Fehler erst im
Qualitäts-Gate auffallen.

## Offene Punkte vor der Serienproduktion

1. **Bilder.** `public/akte-001/` ist leer, alle Shots rendern derzeit
   Platzhalterkarten. Die zwölf Szenenbilder liegen noch nicht als Dateien vor.
2. **Ton und Timing.** Es gibt keine Tonspur. Die Shotdauern sind aus der
   Sprechlänge geschätzt und ergeben 45,6 Sekunden. Sie müssen gegen
   `public/audio/voiceover.m4a` gelegt werden, sobald die Datei vorliegt –
   das bestehende Projekt läuft laut seinem Produktionsplan 60,17 Sekunden,
   die Kanalmaschine empfiehlt für den ersten Cut rund 49 Sekunden.
3. **Redaktionelle Sperre.** `episodes/AKTE-001/script.md` verlangt vor
   Veröffentlichung die Freigabe von Wortlaut, Markenbezeichnung,
   Datenschutzprozess, Vergütungsdefinition und Zahlen durch eine zweite
   Person.
4. **Schrift.** Auf dem Renderer ist keine schmale Plakatschrift installiert;
   der Fallback ist DejaVu Sans Bold. Eine lizenzierte Schrift (Archivo Black,
   Anton o. ä.) gehört nach `public/fonts/`, per `@font-face` eingebunden und
   ins Asset-Ledger eingetragen.
5. **Farbkonflikt.** `Geldakte_Kanalmaschine.md` nennt Petrol `#073F3E` als
   Hauptfarbe und einen menschlichen Finanzermittler; STILANALYSE und alle
   vorhandenen Bilder zeigen Dunkelblau und den Tresorkopf. Aufgelöst
   zugunsten der jüngeren Quelle – gehört ins Decision Log, siehe
   `src/theme/tokens.ts`.
6. **Lizenz.** Remotion ist für Firmen ab vier Personen kostenpflichtig. Die
   geplante Skalierung auf zehn Arbeitsplätze überschreitet diese Grenze –
   Konditionen prüfen und in die Wirtschaftlichkeitsrechnung aufnehmen.
