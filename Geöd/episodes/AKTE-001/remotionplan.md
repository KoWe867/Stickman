# AKTE 001: Remotion-Produktionsplan

## Bestand

- Einstieg: `src/index.ts` registriert `RemotionRoot`.
- Komposition: `src/Root.tsx`, `Geldakte-Akte001`, 1080 x 1920, 30 fps, 1805 Frames.
- Timeline: `src/data.ts`, 13 vorhandene Szene-Dateien, Gesamtdauer 60,17 Sekunden.
- Rendering: `npm run render`; FFmpeg-Fallback in `scripts/render-ffmpeg.sh`.
- Audio: `public/audio/voiceover.m4a`.
- Captions: `public/captions/akte001.ass`; in `src/Akte001.tsx` derzeit auskommentiert.

## Ausführung

1. Finalen Sprechertext gegen die vorhandene Audiodatei abhören.
2. Szenen-Timing und Caption-Cues synchronisieren, ohne bestehende Dateien zu überschreiben.
3. Caption-Entscheidung treffen: Remotion-Overlay aktivieren oder ASS ausschließlich im FFmpeg-Master verwenden.
4. Rechenbild auf `2 x 4 x 20 = 160` und `160 x 35 EUR = 5.600 EUR` prüfen.
5. Still auf Hook, Rechnung und CTA rendern.
6. Vollständigen Master mit Audio rendern.
7. Frame-Enden, leere Bilder, Safe Zones, Lautheit und Caption-Lesbarkeit prüfen.

## Offene technische Voraussetzungen

- FFmpeg und ffprobe fehlen in der aktuellen Shellumgebung.
- Die ASS-Datei ist nicht deckungsgleich mit dem neuen Skript.
- Eine Voice-Datei ist vorhanden, aber die Übereinstimmung mit dem finalen Text ist nicht verifiziert.
- Es gibt keinen dokumentierten letzten QA-Bericht.

Es werden keine Uploads und keine automatischen Veröffentlichungen ausgeführt.