/**
 * Zentrale Szenendaten für GELDAKTE 002 – Die Brillen-Illusion.
 *
 * Alle Frame-Werte sind fest und decken sich mit dem freigegebenen
 * Storyboard (1080x1920, 30 fps, 1500 Frames, 13 Szenen). Keine Komponente
 * darf eigene Zeitwerte definieren – Timing kommt ausschliesslich von hier.
 */

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const TOTAL_FRAMES = 1500;

export type SceneId =
  | 'brand-grid'
  | 'essilor-reveal'
  | 'ownership-matrix'
  | 'exploded-glasses'
  | 'retail-network'
  | 'value-chain'
  | 'oakley-timeline'
  | 'sunglass-hut'
  | 'order-cards'
  | 'stock-crash'
  | 'takeover'
  | 'checkout-flow'
  | 'final-loop';

export type Scene = {
  readonly id: SceneId;
  /** Fortlaufende Szenennummer laut Storyboard (1–13). */
  readonly nummer: number;
  readonly from: number;
  readonly durationInFrames: number;
  /** Kurzer On-Screen-Text, siehe SceneLabel. */
  readonly label: string;
  /** Vollständiger Sprechertext dieser Szene für die Captions. */
  readonly voiceover: string;
  /** Einziges Schlüsselwort mit Akzentfarbe (Caption-Regeln). */
  readonly keyword?: string;
};

export const scenes: readonly Scene[] = [
  {
    id: 'brand-grid',
    nummer: 1,
    from: 0,
    durationInFrames: 90,
    label: 'KONKURRENZ?',
    voiceover: 'Ray-Ban, Oakley, Prada, Chanel: Sieht nach Konkurrenz aus, oder?',
    keyword: 'Konkurrenz',
  },
  {
    id: 'essilor-reveal',
    nummer: 2,
    from: 90,
    durationInFrames: 90,
    label: 'EIN KONZERN.',
    voiceover: 'Doch hinter allen vier steckt derselbe Brillengigant: EssilorLuxottica.',
    keyword: 'EssilorLuxottica',
  },
  {
    id: 'ownership-matrix',
    nummer: 3,
    from: 180,
    durationInFrames: 120,
    label: 'EIGENTUM / LIZENZ',
    voiceover:
      'Ray-Ban und Oakley gehören dem Konzern. Für Prada und Chanel produziert er Brillen in Lizenz.',
    keyword: 'Lizenz',
  },
  {
    id: 'exploded-glasses',
    nummer: 4,
    from: 300,
    durationInFrames: 90,
    label: 'AUCH DIE GLÄSER',
    voiceover: 'Zugleich produziert die Gruppe auch Brillengläser.',
    keyword: 'Brillengläser',
  },
  {
    id: 'retail-network',
    nummer: 5,
    from: 390,
    durationInFrames: 120,
    label: '18.000 GESCHÄFTE',
    voiceover: 'Dazu betreibt sie weltweit rund 18.000 Geschäfte.',
    keyword: '18.000',
  },
  {
    id: 'value-chain',
    nummer: 6,
    from: 510,
    durationInFrames: 120,
    label: 'ALLES IN EINER KETTE',
    voiceover:
      'Marke, Glas, Produktion, Verkauf: Diese Kontrolle nennt man vertikale Integration.',
    keyword: 'Integration.',
  },
  {
    id: 'oakley-timeline',
    nummer: 7,
    from: 630,
    durationInFrames: 120,
    label: 'OAKLEY · 2001',
    voiceover: 'Wie viel Macht darin steckt, zeigte 2001 der Fall Oakley.',
    keyword: 'Oakley.',
  },
  {
    id: 'sunglass-hut',
    nummer: 8,
    from: 750,
    durationInFrames: 120,
    label: 'SUNGLASS HUT GEKAUFT',
    voiceover:
      'Luxottica kaufte Sunglass Hut, damals einen der wichtigsten Vertriebspartner von Oakley.',
    keyword: 'Sunglass',
  },
  {
    id: 'order-cards',
    nummer: 9,
    from: 870,
    durationInFrames: 120,
    label: 'BESTELLUNGEN RUNTER',
    voiceover: 'Kurz darauf bestellte die Kette deutlich weniger Oakley-Produkte.',
    keyword: 'weniger',
  },
  {
    id: 'stock-crash',
    nummer: 10,
    from: 990,
    durationInFrames: 120,
    label: '−37 % · EIN TAG',
    voiceover:
      'Nach Oakleys Gewinnwarnung stürzte die Aktie an einem Tag um 37 Prozent.',
    keyword: '37',
  },
  {
    id: 'takeover',
    nummer: 11,
    from: 1110,
    durationInFrames: 120,
    label: '2,1 MILLIARDEN $',
    voiceover:
      'Sechs Jahre später kam die nächste Wendung: Luxottica übernahm Oakley für rund 2,1 Milliarden Dollar.',
    keyword: '2,1',
  },
  {
    id: 'checkout-flow',
    nummer: 12,
    from: 1230,
    durationInFrames: 150,
    label: 'DREI WEGE ZUR KASSE',
    voiceover: 'Heute kann derselbe Konzern an Marke, Glas und Verkauf verdienen.',
    keyword: 'verdienen.',
  },
  {
    id: 'final-loop',
    nummer: 13,
    from: 1380,
    durationInFrames: 120,
    label: 'WIE VIEL KONKURRENZ?',
    voiceover: 'Du siehst Auswahl. Aber wie viel Konkurrenz bleibt davon wirklich?',
    keyword: 'Konkurrenz',
  },
];

export const KLEINDRUCK =
  'Modellhafte Darstellung anhand öffentlich bekannter Konzernstruktur und des Falls Oakley (2001–2007). Keine Anlageberatung.';

/** Startframes zur Kontrolle: müssen exakt an TOTAL_FRAMES anschliessen. */
export const pruefeSzenen = (): string[] => {
  const befunde: string[] = [];
  let cursor = 0;
  scenes.forEach((s) => {
    if (s.from !== cursor) {
      befunde.push(
        `Szene ${s.nummer} (${s.id}): erwartet from=${cursor}, hat ${s.from}.`,
      );
    }
    cursor += s.durationInFrames;
  });
  if (cursor !== TOTAL_FRAMES) {
    befunde.push(`Gesamtlänge ${cursor} weicht von TOTAL_FRAMES=${TOTAL_FRAMES} ab.`);
  }
  return befunde;
};
