import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {colors, fonts} from '../../../theme/tokens';
import {WIDTH} from '../geldakte002Data';

/**
 * Szene 6 (510–629): seitliche Kamerafahrt entlang einer zusammenhängenden
 * Produktionskette Marke → Rahmen → Glas → Geschäft. Jede Station leuchtet
 * auf, sobald sie "genannt" wird (Beat alle 30 Frames), die Kette bleibt als
 * ein einziges räumliches System sichtbar.
 */
const stations = [
  {label: 'MARKE', x: 260, litAt: 0},
  {label: 'RAHMEN', x: 700, litAt: 30},
  {label: 'GLAS', x: 1140, litAt: 60},
  {label: 'GESCHÄFT', x: 1580, litAt: 90},
] as const;

const CHAIN_Y = 960;

export const ValueChain: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraX = interpolate(frame, [0, 119], [WIDTH / 2 - stations[0].x, WIDTH / 2 - stations[3].x]);

  return (
    <AbsoluteFill style={{backgroundColor: colors.dunkelblauTief, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 2000,
          height: 1920,
          transform: `translateX(${cameraX}px)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: CHAIN_Y - 6,
            left: stations[0].x,
            width: stations[3].x - stations[0].x,
            height: 12,
            backgroundColor: colors.kontur,
            borderRadius: 6,
          }}
        />

        {stations.map((s) => {
          const glow = interpolate(frame, [s.litAt, s.litAt + 14], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const scale = interpolate(glow, [0, 1], [0.82, 1]);

          return (
            <div
              key={s.label}
              style={{
                position: 'absolute',
                left: s.x - 140,
                top: CHAIN_Y - 110,
                width: 280,
                height: 220,
                transform: `scale(${scale})`,
                borderRadius: 20,
                border: `5px solid ${colors.kontur}`,
                backgroundColor: colors.dunkelblau,
                overflow: 'hidden',
                boxShadow: `0 0 ${40 * glow}px ${10 * glow}px rgba(214,138,58,${0.6 * glow})`,
                opacity: interpolate(glow, [0, 0.2, 1], [0.4, 1, 1]),
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: colors.kupfer,
                  opacity: glow,
                }}
              />
              <div
                style={{
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    fontFamily: fonts.display,
                    fontWeight: fonts.displayWeight,
                    fontSize: 40,
                    letterSpacing: '0.04em',
                    color: colors.creme,
                    textAlign: 'center',
                    opacity: 1 - glow,
                  }}
                >
                  {s.label}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    fontFamily: fonts.display,
                    fontWeight: fonts.displayWeight,
                    fontSize: 40,
                    letterSpacing: '0.04em',
                    color: colors.kontur,
                    textAlign: 'center',
                    opacity: glow,
                  }}
                >
                  {s.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
