import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts, safeZone} from '../theme/tokens';

/**
 * Kurzer On-Screen-Text ("KONKURRENZ?", "EIN KONZERN.", ...).
 *
 * Sitzt bewusst im oberen Sicherheitsbereich, damit er sich mit den
 * Voiceover-Captions am unteren Rand (siehe Captions.tsx) niemals räumlich
 * überschneidet.
 */
export const SceneLabel: React.FC<{readonly text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const einblenden = spring({
    frame,
    fps,
    config: {damping: 13, mass: 0.5, stiffness: 180},
    durationInFrames: 10,
  });

  const scale = interpolate(einblenden, [0, 1], [0.7, 1]);
  const opacity = interpolate(einblenden, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        left: safeZone.horizontal,
        right: safeZone.horizontal,
        top: safeZone.top - 100,
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
          fontSize: 52,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          textAlign: 'center',
          color: colors.dunkelblauTief,
          backgroundColor: colors.creme,
          border: `5px solid ${colors.kontur}`,
          borderRadius: 14,
          padding: '14px 30px',
          boxShadow: '0 14px 26px rgba(0,0,0,0.35)',
        }}
      >
        {text}
      </span>
    </div>
  );
};
