/**
 * Farb- und Typo-Tokens für GELDAKTE.
 *
 * Quelle: Geöd/referenzen/STILANALYSE.md, Abschnitt "Was den Referenzstil ausmacht".
 * Farbwelt aus Creme, Dunkelblau und Burgunderrot; Grün ausschliesslich als
 * Erfolgs- bzw. Bestätigungssignal.
 */

export const colors = {
  /** Grundfläche, Hintergründe, Schlüsselwörter */
  creme: '#F2E4C9',
  cremeHell: '#FBF3E2',

  /** Anzüge, Konturen, dunkle Flächen */
  dunkelblau: '#1B2A47',
  dunkelblauTief: '#101A2E',

  /** Akten, Akzente, Alarmzustände */
  burgund: '#7A1F2B',
  burgundHell: '#A33141',

  /** Nur für Erfolg und Bestätigung verwenden – nie dekorativ. */
  gruen: '#2E9E5B',

  /** Outline und Text auf hellem Grund */
  kontur: '#0D1626',

  /** Warnsignal in Zahlen und Verlusten */
  signalOrange: '#E8862B',
} as const;

/**
 * Schriftstapel. Bewusst ein System-Stack: eine lizenzierte Schrift gehört in
 * das Asset-Ledger (rights/asset-ledger.csv) und wird erst danach eingebunden.
 *
 * OFFEN: Auf dem Renderer ist derzeit keine schmale, sehr fette Display-Schrift
 * installiert (verfügbar sind nur DejaVu, Liberation, FreeSans). Der Fallback
 * rendert deshalb in DejaVu Sans Bold statt im gewünschten Plakatschnitt.
 * Für die Serienproduktion muss eine lizenzierte Schrift wie Archivo Black
 * oder Anton als Datei nach `public/fonts/` gelegt, per `@font-face`
 * eingebunden und im Asset-Ledger erfasst werden.
 */
export const fonts = {
  display:
    '"Archivo Black", "Anton", Impact, "Haettenschweiler", "Arial Black", "DejaVu Sans", sans-serif',
  body: '"Inter", "Helvetica Neue", "DejaVu Sans", Arial, sans-serif',
  /** Ohne echte Plakatschrift trägt das Gewicht die Lesbarkeit. */
  displayWeight: 900,
} as const;

/** Videoformat laut Handbuch, Abschnitt 5 (Arbeitsplatz C). */
export const format = {
  width: 1080,
  height: 1920,
  fps: 30,
} as const;

/**
 * Sichtbarer Bereich. TikTok blendet unten die Beschreibung und rechts die
 * Aktionsleiste ein, oben liegt der Systembalken.
 */
export const safeZone = {
  top: 220,
  bottom: 420,
  horizontal: 80,
} as const;
