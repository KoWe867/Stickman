/**
 * Farb- und Typo-Tokens für GELDAKTE.
 *
 * Quelle: Geöd/referenzen/STILANALYSE.md, Abschnitt "Was den Referenzstil ausmacht".
 * Farbwelt aus Creme, Dunkelblau und Burgunderrot; Grün ausschliesslich als
 * Erfolgs- bzw. Bestätigungssignal.
 */

/**
 * KONFLIKT, bewusst so aufgelöst:
 * `Geldakte_Kanalmaschine.md` (20. Aug.) nennt als Hauptfarbe tiefes Petrol
 * `#073F3E` und beschreibt einen menschlichen Finanzermittler im Trenchcoat.
 * Die `STILANALYSE.md` und sämtliche vorhandenen Szenenbilder zeigen dagegen
 * Dunkelblau und den Tresorkopf. Der `Produktionsbetrieb.md` (27. Aug.,
 * jünger) erklärt den Roboter zur vorläufigen Referenz für die erste Woche.
 *
 * Deshalb: Dunkelblau als Anzug-/Flächenfarbe, aber die exakten Hexwerte der
 * Kanalmaschine für Elfenbein, Burgunder, Kupfer und Anthrazit. Die
 * Petrol-Entscheidung gehört ins Decision Log, bevor Serienfolgen laufen.
 */
export const colors = {
  /** Grundfläche und Hintergründe – Elfenbein aus der Kanalmaschine. */
  creme: '#F3E8CF',
  cremeHell: '#FBF3E2',

  /** Anzüge, Konturen, dunkle Flächen (STILANALYSE, nicht Petrol). */
  dunkelblau: '#1B2A47',
  dunkelblauTief: '#101A2E',

  /** Akten, Akzente, Alarmzustände – Burgunder aus der Kanalmaschine. */
  burgund: '#701C32',
  burgundHell: '#A33141',

  /** Nur für Erfolg und Bestätigung verwenden – nie dekorativ. */
  gruen: '#2E9E5B',

  /** Outline und Text – Anthrazit aus der Kanalmaschine. */
  kontur: '#15191A',

  /** Kupfer: Schlüsselwörter, Zahlen, Warnsignale. */
  kupfer: '#D68A3A',

  /** Alias für Bestandscode; identisch mit Kupfer. */
  signalOrange: '#D68A3A',

  /** Hauptfarbe laut Kanalmaschine – derzeit nicht verwendet, siehe Konflikt. */
  petrol: '#073F3E',
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
