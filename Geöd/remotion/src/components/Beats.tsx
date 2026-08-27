import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts, safeZone} from '../theme/tokens';

/**
 * Innere Informationsbeats eines Shots. Die Animationsregie verlangt
 * „Rechenfaktoren nacheinander einblenden; beim Ergebnis kurz halten“ –
 * jeder Beat läuft einzeln ein, der letzte bekommt einen Anschlag.
 *
 * Die Beats verteilen sich über die ersten zwei Drittel des Shots, damit das
 * Ergebnis danach stehen bleibt.
 */
export const Beats: React.FC<{readonly beats: readonly string[]}> = ({
  beats,
}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const verteilFenster = durationInFrames * 0.66;
  const abstand = verteilFenster / beats.length;

  return (
    <div
      style={{
        position: 'absolute',
        left: safeZone.horizontal,
        right: safeZone.horizontal,
        top: safeZone.top + 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 18,
      }}
    >
      {beats.map((beat, index) => {
        const start = index * abstand;
        const istLetzter = index === beats.length - 1;
        const auftritt = spring({
          frame: frame - start,
          fps,
          config: istLetzter
            ? {damping: 9, mass: 0.5, stiffness: 170}
            : {damping: 14, mass: 0.5},
          durationInFrames: 10,
        });

        return (
          <span
            key={beat}
            style={{
              fontFamily: fonts.display,
              fontWeight: fonts.displayWeight,
              fontSize: istLetzter ? 82 : 58,
              lineHeight: 1.05,
              textAlign: 'center',
              textTransform: 'uppercase',
              color: istLetzter ? colors.kupfer : colors.creme,
              opacity: interpolate(auftritt, [0, 1], [0, 1]),
              transform: `scale(${interpolate(
                auftritt,
                [0, 1],
                [istLetzter ? 1.4 : 0.9, 1],
              )})`,
              textShadow: `8px 0 0 ${colors.kontur}, -8px 0 0 ${colors.kontur}, 0 8px 0 ${colors.kontur}, 0 -8px 0 ${colors.kontur}, 6px 6px 0 ${colors.kontur}, -6px -6px 0 ${colors.kontur}, 6px -6px 0 ${colors.kontur}, -6px 6px 0 ${colors.kontur}`,
            }}
          >
            {beat}
          </span>
        );
      })}
    </div>
  );
};
