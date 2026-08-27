import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

// Hochformat für TikTok/Shorts. Die Kompositionen setzen die Maße selbst,
// diese Werte gelten für Stills und Vorschauen ohne explizite Angabe.
Config.setCodec('h264');
Config.setCrf(18);
