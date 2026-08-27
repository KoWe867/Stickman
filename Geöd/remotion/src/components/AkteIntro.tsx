import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors, fonts} from '../theme/tokens';

/**
 * Pflicht-Auftakt laut Handbuch, Abschnitt 5:
 * „Geldwege, die sich verboten anfühlen. Akte [NUMMER].“
 *
 * Bewusst als harter, kurzer Stempel gebaut: die Zeile ist selbst der Hook
 * (verbotene Aussage) und muss innerhalb der ersten 0,5 Sekunden stehen –
 * ein langsames Titelbild würde das Hook-Fenster verbrennen.
 */
export const AkteIntro: React.FC<{readonly nummer: string}> = ({nummer}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const stempel = spring({
    frame,
    fps,
    config: {damping: 11, mass: 0.4, stiffness: 200},
    durationInFrames: 8,
  });

  const scale = interpolate(stempel, [0, 1], [1.6, 1]);
  const rotation = interpolate(stempel, [0, 1], [-9, -3]);
  const ausblenden = interpolate(
    frame,
    [durationInFrames - 5, durationInFrames],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.dunkelblauTief,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: ausblenden,
      }}
    >
      <div
        style={{
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          border: `14px solid ${colors.burgundHell}`,
          borderRadius: 18,
          padding: '54px 68px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 22,
          backgroundColor: 'rgba(122, 31, 43, 0.18)',
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: fonts.displayWeight,
            fontSize: 68,
            lineHeight: 1.08,
            textAlign: 'center',
            textTransform: 'uppercase',
            color: colors.creme,
            maxWidth: 820,
          }}
        >
          Geldwege, die sich
          <br />
          verboten anfühlen
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: fonts.displayWeight,
            fontSize: 132,
            lineHeight: 1,
            color: colors.signalOrange,
            letterSpacing: '0.04em',
          }}
        >
          AKTE {nummer}
        </div>
      </div>
    </AbsoluteFill>
  );
};
