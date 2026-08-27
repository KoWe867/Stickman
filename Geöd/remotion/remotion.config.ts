import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

// Sandbox erlaubt keine externen Downloads während des Renderings
// ("Keine externen URLs während des Renderings"). Diese Umgebung bringt
// bereits einen Chromium Headless Shell mit (für Playwright vorinstalliert);
// er wird hier wiederverwendet statt Remotions eigenen herunterzuladen.
if (process.env.REMOTION_BROWSER_EXECUTABLE) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
}

// Hochformat für TikTok/Shorts. Die Kompositionen setzen die Maße selbst,
// diese Werte gelten für Stills und Vorschauen ohne explizite Angabe.
Config.setCodec('h264');
Config.setCrf(18);
