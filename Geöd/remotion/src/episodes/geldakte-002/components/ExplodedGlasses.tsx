import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../../theme/tokens';

/**
 * Szene 4 (300–389): Storyboard verlangt eine reale, freigestellte
 * Produktfotografie einer Brille in drei Tiefenebenen. Diese Fotografie
 * liegt nicht im Repository vor (siehe Missing-Assets-Bericht) – anstelle
 * einer nachgebauten Illustration zeigt die Szene die drei Ebenen als klar
 * beschriftete Platzhalter, im selben Stil wie der Platzhalter aus
 * Szene.tsx (AKTE 001). Die geforderte Bewegung – Ebenen lösen sich,
 * schweben nach vorn, rasten mit mechanischem Impuls wieder ein – bleibt
 * vollständig erhalten.
 */
// vZ: vertikale Trennrichtung beim Explodieren (negativ = nach oben).
// depth: wie weit die Ebene "nach vorn" tritt (Skalierung + Schattentiefe).
const layers = [
  {label: 'VORDERRAHMEN', vZ: -1, depth: 1, baseY: 560, width: 620, height: 200},
  {label: 'GLÄSER', vZ: 0, depth: 3, baseY: 800, width: 620, height: 220},
  {label: 'BÜGEL', vZ: 1, depth: 1, baseY: 1040, width: 620, height: 160},
] as const;

export const ExplodedGlasses: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const explode = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const snap = spring({
    frame: frame - 48,
    fps,
    config: {damping: 7, mass: 0.6, stiffness: 220},
    durationInFrames: 18,
  });

  const shake =
    frame >= 48 && frame < 58
      ? Math.sin((frame - 48) * 2.4) * (10 - (frame - 48))
      : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.dunkelblau,
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translateX(${shake}px)`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 26,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: colors.signalOrange,
          position: 'absolute',
          top: 420,
        }}
      >
        Echtes Produktfoto fehlt · schematische Ebenen
      </div>

      {layers.map((layer) => {
        const separation = interpolate(explode, [0, 1], [0, layer.vZ * 70]);
        const settle = interpolate(snap, [0, 1], [separation, 0]);
        const offset = frame < 48 ? separation : settle;
        const scale = 1 + (layer.depth - 1) * 0.06 * explode;

        return (
          <div
            key={layer.label}
            style={{
              position: 'absolute',
              top: layer.baseY + offset,
              width: layer.width,
              height: layer.height,
              left: (1080 - layer.width) / 2,
              transform: `scale(${scale})`,
              backgroundColor: colors.dunkelblauTief,
              border: `4px solid ${colors.creme}`,
              borderRadius: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 ${16 + layer.depth * 8}px ${24 + layer.depth * 8}px rgba(0,0,0,0.5)`,
            }}
          >
            <span
              style={{
                fontFamily: fonts.display,
                fontWeight: fonts.displayWeight,
                fontSize: 40,
                letterSpacing: '0.06em',
                color: colors.creme,
              }}
            >
              {layer.label}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
