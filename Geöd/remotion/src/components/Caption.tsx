import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts, safeZone} from '../theme/tokens';

/**
 * Schlüsselwort-Caption: creme auf sehr starker dunkler Outline, 2–5 Wörter.
 * Ersetzt bewusst lange Untertitelzeilen (STILANALYSE, Punkt 4).
 */
export const Caption: React.FC<{
  readonly text: string;
  readonly erfolg?: boolean;
}> = ({text, erfolg = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  if (!text.trim()) {
    return null;
  }

  const einblenden = spring({
    frame,
    fps,
    config: {damping: 14, mass: 0.5},
    durationInFrames: 12,
  });

  const scale = interpolate(einblenden, [0, 1], [0.82, 1]);
  const opacity = interpolate(einblenden, [0, 1], [0, 1]);

  // Mehrfacher Schatten erzeugt die dicke, gleichmässige Kontur.
  const konturBreite = 10;
  const schatten = [
    `${konturBreite}px 0 0 ${colors.kontur}`,
    `-${konturBreite}px 0 0 ${colors.kontur}`,
    `0 ${konturBreite}px 0 ${colors.kontur}`,
    `0 -${konturBreite}px 0 ${colors.kontur}`,
    `${konturBreite}px ${konturBreite}px 0 ${colors.kontur}`,
    `-${konturBreite}px -${konturBreite}px 0 ${colors.kontur}`,
    `${konturBreite}px -${konturBreite}px 0 ${colors.kontur}`,
    `-${konturBreite}px ${konturBreite}px 0 ${colors.kontur}`,
    `0 18px 34px rgba(0,0,0,0.55)`,
  ].join(', ');

  return (
    <div
      style={{
        position: 'absolute',
        left: safeZone.horizontal,
        right: safeZone.horizontal,
        bottom: safeZone.bottom,
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
          fontSize: 104,
          lineHeight: 1.05,
          letterSpacing: '-0.01em',
          textAlign: 'center',
          textTransform: 'uppercase',
          color: erfolg ? colors.gruen : colors.creme,
          textShadow: schatten,
          WebkitTextStroke: `2px ${colors.kontur}`,
        }}
      >
        {text}
      </span>
    </div>
  );
};
