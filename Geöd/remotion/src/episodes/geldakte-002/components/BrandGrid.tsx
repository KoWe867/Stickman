import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Card} from '../../../components/Card';
import {colors} from '../../../theme/tokens';
import {WIDTH, HEIGHT} from '../geldakte002Data';

/**
 * Szene 1 (0–89): vier Markenkarten fliegen mit 6 Frames Versatz aus vier
 * Richtungen ein, Depth-Push 92→100%, am Ende Verbindungslinien zur Mitte.
 */
type Brand = {
  readonly name: string;
  readonly fromX: number;
  readonly fromY: number;
  readonly toX: number;
  readonly toY: number;
  readonly delay: number;
};

const CENTER_X = WIDTH / 2;
const CENTER_Y = 900;

const brands: readonly Brand[] = [
  {name: 'RAY-BAN', fromX: -500, fromY: -500, toX: CENTER_X - 300, toY: CENTER_Y - 220, delay: 0},
  {name: 'OAKLEY', fromX: WIDTH + 500, fromY: -500, toX: CENTER_X + 300, toY: CENTER_Y - 220, delay: 6},
  {name: 'PRADA', fromX: -500, fromY: HEIGHT + 500, toX: CENTER_X - 300, toY: CENTER_Y + 220, delay: 12},
  {name: 'CHANEL', fromX: WIDTH + 500, fromY: HEIGHT + 500, toX: CENTER_X + 300, toY: CENTER_Y + 220, delay: 18},
];

export const BrandGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const groupPush = interpolate(frame, [46, 66], [0.92, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const linesIn = interpolate(frame, [70, 88], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: colors.cremeHell}}>
      <AbsoluteFill style={{perspective: 1600}}>
        <svg
          width={WIDTH}
          height={HEIGHT}
          style={{position: 'absolute', top: 0, left: 0, opacity: linesIn}}
        >
          {brands.map((b) => (
            <line
              key={b.name}
              x1={CENTER_X}
              y1={CENTER_Y}
              x2={b.toX}
              y2={b.toY}
              stroke={colors.kupfer}
              strokeWidth={4}
              strokeDasharray={600}
              strokeDashoffset={600 - 600 * linesIn}
            />
          ))}
        </svg>

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: WIDTH,
            height: HEIGHT,
            transform: `scale(${groupPush})`,
            transformOrigin: `${CENTER_X}px ${CENTER_Y}px`,
          }}
        >
          {brands.map((b) => {
            const arrival = spring({
              frame: frame - b.delay,
              fps,
              config: {damping: 16, mass: 0.7},
              durationInFrames: 34,
            });
            const x = interpolate(arrival, [0, 1], [b.fromX, b.toX]);
            const y = interpolate(arrival, [0, 1], [b.fromY, b.toY]);
            const rotate = interpolate(arrival, [0, 1], [b.delay % 2 === 0 ? -14 : 14, 0]);

            return (
              <div
                key={b.name}
                style={{
                  position: 'absolute',
                  left: x - 160,
                  top: y - 100,
                  transform: `rotate(${rotate}deg)`,
                  filter: `drop-shadow(0 24px 30px rgba(0,0,0,0.4))`,
                }}
              >
                <Card title={b.name} accent={colors.dunkelblau} width={320} height={200} />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
