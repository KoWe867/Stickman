import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts, safeZone} from '../theme/tokens';

/**
 * Aktenstempel, etwa MODELLRECHNUNG auf den Zahlenbildern.
 *
 * Qualitäts-Gate Punkt 3 verlangt, dass jede Zahl sichtbar als Beispiel
 * gekennzeichnet ist. Der Stempel schlägt hart ein und bleibt dann stehen.
 */
export const Stempel: React.FC<{readonly text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const einschlag = spring({
    frame,
    fps,
    config: {damping: 8, mass: 0.4, stiffness: 220},
    durationInFrames: 10,
  });

  return (
    <div
      style={{
        position: 'absolute',
        right: safeZone.horizontal,
        top: safeZone.top - 60,
        transform: `rotate(-11deg) scale(${interpolate(
          einschlag,
          [0, 1],
          [2.2, 1],
        )})`,
        opacity: interpolate(einschlag, [0, 0.4, 1], [0, 1, 1]),
        border: `7px solid ${colors.burgundHell}`,
        borderRadius: 10,
        padding: '14px 26px',
      }}
    >
      <span
        style={{
          fontFamily: fonts.display,
          fontWeight: fonts.displayWeight,
          fontSize: 40,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: colors.burgundHell,
        }}
      >
        {text}
      </span>
    </div>
  );
};
