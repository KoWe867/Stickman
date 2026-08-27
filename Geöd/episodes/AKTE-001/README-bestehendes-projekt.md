# Geldakte – Akte 001

Editierbares Remotion-Projekt für ein vertikales TikTok-/Reels-Video im analysierten Cartoon-Explainer-Look. Die vorhandene Sprecherdatei bleibt unverändert und synchron.

## Start

```bash
npm install
npm run studio
```

Im Studio die Komposition `Geldakte-Akte001` öffnen.

## Final rendern

```bash
npm run render
```

Die MP4 liegt anschließend unter `out/AKTE001-SILENT-PROFIT-STYLE.mp4`.

Falls auf einem Rechner noch kein Chromium für Remotion installiert ist, liefert der enthaltene FFmpeg-Renderer dieselbe Timeline direkt:

```bash
npm run render:ffmpeg
```

## Wo du etwas änderst

- `src/data.ts`: Szenen-Timing, Bildfahrten und alle Captions
- `src/styles.css`: Farben, Schrift, Konturen und Branding
- `public/scenes/`: 13 gezeichnete Szenen
- `public/audio/voiceover.m4a`: Originalton des gelieferten Videos
- `public/brand/tresorkopf.png`: Original-Maskottchen

Technische Daten: 1080 × 1920, 30 fps, 60,17 Sekunden.
