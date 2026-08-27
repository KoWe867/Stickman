import {format} from '../theme/tokens';

/** Richtung der Kamerafahrt über das Standbild. */
export type KenBurns =
  | 'zoom-in'
  | 'zoom-out'
  | 'pan-left'
  | 'pan-right'
  | 'pan-up'
  | 'pan-down';

export type Shot = {
  /** Fortlaufende Nummer, dient der Zuordnung zum Storyboard. */
  readonly id: number;
  /**
   * Dateiname des Bildes in public/<episode>/. Ist der Wert null, rendert die
   * Szene eine beschriftete Platzhalterkarte – so bleibt die Komposition auch
   * ohne fertige Assets lauffähig.
   */
  readonly image: string | null;
  /** Kurzbeschreibung des Bildes, dient als Platzhaltertext und Regieanweisung. */
  readonly beschreibung: string;
  /** Caption: maximal 2–5 Wörter (STILANALYSE). Leerer String blendet sie aus. */
  readonly caption: string;
  /** Grosser Geldbetrag, der zusätzlich eingeblendet wird. */
  readonly betrag?: string;
  /** Sprechertext dieses Shots. Dient der Voice-Regie und dem Caption-Plan. */
  readonly voiceover: string;
  /** Dauer in Sekunden. Handbuch: visueller Wechsel alle 2,0–3,2 Sekunden. */
  readonly sekunden: number;
  readonly kenBurns: KenBurns;
  /** Grün ist laut STILANALYSE ausschliesslich Erfolgssignal. */
  readonly erfolg?: boolean;
  /**
   * Innere Informationsbeats, die nacheinander einlaufen. Die Animationsregie
   * erlaubt „2,0–3,2 Sekunden sichtbarer Wechsel ODER klarer Informationsbeat“ –
   * ein längerer Shot ist also nur zulässig, wenn er sich intern weiterbewegt.
   * Genutzt für die Rechenfaktoren, die einzeln eingeblendet werden.
   */
  readonly beats?: readonly string[];
  /** Sichtbarer Stempel, z. B. MODELLRECHNUNG bei Zahlenbildern. */
  readonly stempel?: string;
};

/** Obergrenze für einen Shot ohne innere Beats (Animationsregie). */
const MAX_SEKUNDEN_OHNE_BEAT = 3.2;

export const sekundenZuFrames = (sekunden: number): number =>
  Math.round(sekunden * format.fps);

/** Gesamtlänge einer Shotliste in Frames. */
export const gesamtFrames = (shots: readonly Shot[]): number =>
  shots.reduce((summe, shot) => summe + sekundenZuFrames(shot.sekunden), 0);

/** Startframe jedes Shots, damit Sequences ohne Lücke aneinandergrenzen. */
export const startFrames = (shots: readonly Shot[]): number[] => {
  const starts: number[] = [];
  let cursor = 0;
  for (const shot of shots) {
    starts.push(cursor);
    cursor += sekundenZuFrames(shot.sekunden);
  }
  return starts;
};

/**
 * Prüft die Shotliste gegen die Regeln aus STILANALYSE.md und dem
 * Qualitäts-Gate des Handbuchs. Verstösse werden beim Rendern als Warnung
 * ausgegeben, damit sie nicht erst in der QA auffallen.
 */
export const pruefeShots = (shots: readonly Shot[]): string[] => {
  const befunde: string[] = [];

  shots.forEach((shot) => {
    if (shot.sekunden > 7) {
      befunde.push(
        `Shot ${shot.id}: ${shot.sekunden}s – kein Bild darf länger als 7 Sekunden unverändert stehen.`,
      );
    }
    const beats = shot.beats?.length ?? 0;
    if (shot.sekunden > MAX_SEKUNDEN_OHNE_BEAT && beats === 0) {
      befunde.push(
        `Shot ${shot.id}: ${shot.sekunden}s ohne inneren Informationsbeat – über ${MAX_SEKUNDEN_OHNE_BEAT}s braucht der Shot Beats.`,
      );
    }
    const woerter = shot.caption.trim().split(/\s+/).filter(Boolean);
    if (woerter.length > 5) {
      befunde.push(
        `Shot ${shot.id}: Caption hat ${woerter.length} Wörter – erlaubt sind maximal 5.`,
      );
    }
  });

  return befunde;
};
