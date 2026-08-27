import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts, safeZone} from '../theme/tokens';

/**
 * Geldbeträge werden laut STILANALYSE besonders gross gezeigt.
 * Sitzt über der Caption, damit beide gleichzeitig lesbar bleiben.
 */
export const Betrag: React.FC<{
  readonly text: string;
  readonly positiv?: boolean;
}> = ({text, positiv = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const anschlag = spring({
    frame,
    fps,
    config: {damping: 9, mass: 0.6, stiffness: 140},
    durationInFrames: 18,
  });

  const scale = interpolate(anschlag, [0, 1], [1.35, 1]);
  const opacity = interpolate(frame, [0, 4], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: safeZone.horizontal,
        right: safeZone.horizontal,
        bottom: safeZone.bottom + 190,
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <span
        style={{
          fontFamily: fonts.display,
          fontWeight: fonts.displayWeight,
          fontSize: 170,
          lineHeight: 1,
          color: positiv ? colors.gruen : colors.signalOrange,
          textShadow: `12px 0 0 ${colors.kontur}, -12px 0 0 ${colors.kontur}, 0 12px 0 ${colors.kontur}, 0 -12px 0 ${colors.kontur}, 10px 10px 0 ${colors.kontur}, -10px -10px 0 ${colors.kontur}, 10px -10px 0 ${colors.kontur}, -10px 10px 0 ${colors.kontur}, 0 22px 40px rgba(0,0,0,0.6)`,
          WebkitTextStroke: `3px ${colors.kontur}`,
        }}
      >
        {text}
      </span>
    </div>
  );
};
