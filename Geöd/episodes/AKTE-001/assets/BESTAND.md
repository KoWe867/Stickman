# AKTE 001 – Asset-Bestand

**Sammelstelle, noch keine Produktionsfreigabe.** Nichts hieraus ist im
Remotion-Projekt verdrahtet. `Geöd/remotion/` bleibt unangetastet, bis die
Freigabe erteilt ist.

## Audio

| Datei | Länge | Format | Herkunft |
|---|---:|---|---|
| `audio/voiceover-v2-elevenlabs-liam.mp3` | 139,62 s | MP3, 44,1 kHz, mono, 192 kb/s | ElevenLabs, Stimme „Liam – Energetic Social Media Creator", Einstellungen laut Dateiname: sp100 s50 sb80 se5 |
| *(nicht hier)* `remotion/public/akte-001/voiceover.m4a` | 60,16 s | AAC, 48 kHz, stereo | ältere Fassung, laut Metadaten mit Remotion 4.0.513 erzeugt |

### Messung der neuen Fassung

- Gesamtlänge **139,62 s**
- **51 Pausen**, zusammen **61,5 s Stille** – das sind **44 % der Laufzeit**
- Reine Sprechzeit damit rund **78 s**

### Offener Konflikt: Laufzeit

| Bezug | Wert |
|---|---|
| `script.md` | 139 Wörter |
| Vorgabe Kanalmaschine | 2,7–2,9 Wörter/s → **rund 50 s** für diesen Text |
| Voiceover v1 | 60,16 s → 2,31 Wörter/s |
| Voiceover v2 | 139,62 s → **1,00 Wörter/s** |
| Unterschied v1 → v2 | **+79,5 s, Faktor 2,3** |

Die neue Fassung ist mehr als doppelt so lang wie die alte und fast dreimal so
lang wie das, was die Kanalmaschine für 139 Wörter vorsieht. Drei mögliche
Ursachen, alle nur durch Abhören zu klären:

1. Es ist ein **längerer Text** als `script.md`.
2. ElevenLabs hat **lange Pausen** gesetzt – dafür sprechen die 44 % Stille.
3. Es liegt **Vor- oder Nachlauf** in der Datei.

**Konsequenz für die Produktion:** Mit 139,62 s ist das kein Short mehr. Bei
einem visuellen Wechsel alle 2,0–3,2 Sekunden bräuchte die Folge rund
**44 bis 70 Shots** statt der geplanten 18. Vor jeder weiteren Arbeit muss
entschieden werden, ob der Ton gekürzt oder das Format geändert wird.

## Bilder

`bilder/` ist leer. Bisher kamen alle Bilder als eingefügte Grafiken in der
Nachricht an, nicht als Datei-Anhang – dabei geht der Dateipfad verloren und
sie lassen sich nicht speichern.

### Beobachtung zu den zuletzt gezeigten fünf Bildern

Die fünf Motive zeigen den Tresorkopf in einer dunklen Finanz-Noir-Welt:
Tresortür mit Beweiswand, Schreibtisch mit Globus und Münzspirale, Gang aus
Wegweisern und Akten, Bahnsteig mit Uhr und steigender Kurve, Lupe über
projizierten Münzstapeln.

**Keines davon entspricht den zwölf Shotprompts aus `visualprompts.md`.** Dort
sind gefordert: Smartphone mit verpasstem Anruf, Dachdecker auf dem Gerüst,
Kundin am Fenster, Stadtkarte mit vier Betriebsmarkern, Chat mit vier Fragen,
Kalenderblock, Rechentafel. Die neuen Bilder sind allgemeine Marken- und
Stimmungsbilder ohne Bezug zur Handlung von AKTE 001.

Das ist kein Fehler, solange es Absicht ist – dann gehören sie aber in einen
Marken-Ordner, nicht in diese Episode. Zu klären, bevor sie einsortiert werden.

## Nächste Schritte

1. Ton abhören und entscheiden: kürzen, neu erzeugen oder Format ändern.
2. Klären, wofür die fünf Noir-Bilder gedacht sind – AKTE 001 oder Markenbild.
3. Bilder als **Datei-Anhang** liefern, damit sie gespeichert werden können.
4. Erst danach Freigabe für die Remotion-Integration.
