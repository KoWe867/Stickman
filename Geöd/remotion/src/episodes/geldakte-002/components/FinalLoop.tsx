import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Card} from '../../../components/Card';
import {colors} from '../../../theme/tokens';
import {WIDTH} from '../geldakte002Data';

/**
 * Szene 13 (1380–1499): Alle Markenkarten erscheinen erneut wie ein Regal,
 * ihre Tiefenebenen werden zusammengedrückt und geben das Konzernnetz
 * dahinter frei. Die Kamera fährt durch die Ray-Ban-Karte zurück zur
 * Ausgangsposition von Frame 0 – am Ende steht dieselbe leere, cremefarbene
 * Fläche wie zu Beginn von Szene 1 (Match-Cut-Bedingung).
 */
const CENTER_X = WIDTH / 2;
const CENTER_Y = 900;

const brands = [
  {name: 'RAY-BAN', x: CENTER_X - 300, y: CENTER_Y - 220},
  {name: 'OAKLEY', x: CENTER_X + 300, y: CENTER_Y - 220},
  {name: 'PRADA', x: CENTER_X - 300, y: CENTER_Y + 220},
  {name: 'CHANEL', x: CENTER_X + 300, y: CENTER_Y + 220},
] as const;

const RAYBAN = brands[0];

export const FinalLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const shelfIn = spring({frame, fps, config: {damping: 14, mass: 0.6}, durationInFrames: 20});

  const compress = interpolate(frame, [40, 66], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const linesIn = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const push = interpolate(frame, [72, 112], [1, 26], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const finalFade = interpolate(frame, [100, 116], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: colors.cremeHell}}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: WIDTH,
          height: 1920,
          transform: `scale(${push})`,
          transformOrigin: `${RAYBAN.x}px ${RAYBAN.y}px`,
        }}
      >
        <svg width={WIDTH} height={1920} style={{position: 'absolute', top: 0, left: 0, opacity: linesIn}}>
          {brands.map((b) => (
            <line
              key={b.name}
              x1={CENTER_X}
              y1={CENTER_Y}
              x2={b.x}
              y2={b.y}
              stroke={colors.kupfer}
              strokeWidth={4}
            />
          ))}
        </svg>

        <div
          style={{
            position: 'absolute',
            left: CENTER_X - 24,
            top: CENTER_Y - 24,
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: colors.dunkelblau,
            opacity: linesIn,
          }}
        />

        {brands.map((b) => {
          const scale = interpolate(shelfIn, [0, 1], [0.6, 1]) * interpolate(compress, [0, 1], [1, 0.04]);
          return (
            <div
              key={b.name}
              style={{
                position: 'absolute',
                left: b.x - 160,
                top: b.y - 100,
                transform: `scale(${scale})`,
                opacity: interpolate(shelfIn, [0, 1], [0, 1]) * interpolate(compress, [0, 1], [1, 0.15]),
              }}
            >
              <Card title={b.name} width={320} height={200} />
            </div>
          );
        })}
      </div>

      <AbsoluteFill style={{backgroundColor: colors.cremeHell, opacity: finalFade}} />
    </AbsoluteFill>
  );
};
