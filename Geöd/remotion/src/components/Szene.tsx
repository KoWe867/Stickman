import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors, fonts, safeZone} from '../theme/tokens';
import type {KenBurns, Shot} from '../lib/shots';
import {Beats} from './Beats';
import {Betrag} from './Betrag';
import {Caption} from './Caption';
import {Stempel} from './Stempel';

const kamerafahrt = (
  art: KenBurns,
  fortschritt: number,
): {scale: number; x: number; y: number} => {
  // Leichte Fahrten auf statischen Illustrationen (STILANALYSE, Punkt 5).
  const weg = 44;
  switch (art) {
    case 'zoom-in':
      return {scale: interpolate(fortschritt, [0, 1], [1.0, 1.12]), x: 0, y: 0};
    case 'zoom-out':
      return {scale: interpolate(fortschritt, [0, 1], [1.12, 1.0]), x: 0, y: 0};
    case 'pan-left':
      return {
        scale: 1.12,
        x: interpolate(fortschritt, [0, 1], [weg, -weg]),
        y: 0,
      };
    case 'pan-right':
      return {
        scale: 1.12,
        x: interpolate(fortschritt, [0, 1], [-weg, weg]),
        y: 0,
      };
    case 'pan-up':
      return {
        scale: 1.12,
        x: 0,
        y: interpolate(fortschritt, [0, 1], [weg, -weg]),
      };
    case 'pan-down':
      return {
        scale: 1.12,
        x: 0,
        y: interpolate(fortschritt, [0, 1], [-weg, weg]),
      };
  }
};

/**
 * Platzhalter, solange das Bild eines Shots noch fehlt. Zeigt Nummer und
 * Regieanweisung, damit Timing und Captions ohne fertige Assets geprüft
 * werden können.
 */
const Platzhalter: React.FC<{
  readonly nummer: number;
  readonly beschreibung: string;
  /** Bei Shots mit Beats belegen diese das obere Drittel – dann kompakt. */
  readonly kompakt: boolean;
}> = ({nummer, beschreibung, kompakt}) => (
  <AbsoluteFill
    style={{
      backgroundColor: colors.dunkelblau,
      alignItems: 'center',
      // Endet oberhalb der Zone, in der Betrag und Caption liegen – sonst
      // überlagern sich Platzhaltertext und Text-Overlays unlesbar.
      justifyContent: 'flex-start',
      paddingTop: kompakt ? 780 : 300,
      paddingInline: 90,
      paddingBottom: safeZone.bottom + 340,
      gap: kompakt ? 18 : 40,
    }}
  >
    {kompakt ? null : (
      <div
        style={{
          fontFamily: fonts.display,
          fontWeight: fonts.displayWeight,
          fontSize: 220,
          color: colors.burgundHell,
          lineHeight: 1,
        }}
      >
        {String(nummer).padStart(2, '0')}
      </div>
    )}
    <div
      style={{
        fontFamily: fonts.body,
        fontSize: kompakt ? 32 : 46,
        lineHeight: 1.35,
        textAlign: 'center',
        color: colors.creme,
        opacity: kompakt ? 0.6 : 0.85,
      }}
    >
      {kompakt ? `${String(nummer).padStart(2, '0')} · ` : ''}
      {beschreibung}
    </div>
    <div
      style={{
        fontFamily: fonts.body,
        fontSize: 30,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: colors.signalOrange,
      }}
    >
      Bild fehlt
    </div>
  </AbsoluteFill>
);

export const Szene: React.FC<{
  readonly shot: Shot;
  readonly episode: string;
}> = ({shot, episode}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const fortschritt = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const {scale, x, y} = kamerafahrt(shot.kenBurns, fortschritt);

  return (
    <AbsoluteFill style={{backgroundColor: colors.cremeHell}}>
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translate(${x}px, ${y}px)`,
        }}
      >
        {shot.image === null ? (
          <Platzhalter
            nummer={shot.id}
            beschreibung={shot.beschreibung}
            kompakt={Boolean(shot.beats?.length)}
          />
        ) : (
          <Img
            src={staticFile(`${episode}/${shot.image}`)}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        )}
      </AbsoluteFill>

      {shot.beats ? <Beats beats={shot.beats} /> : null}
      {shot.stempel ? <Stempel text={shot.stempel} /> : null}
      {shot.betrag ? (
        <Betrag text={shot.betrag} positiv={shot.erfolg} />
      ) : null}
      <Caption text={shot.caption} erfolg={shot.erfolg} />
    </AbsoluteFill>
  );
};
