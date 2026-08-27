import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Card} from '../../../components/Card';
import {colors, fonts} from '../../../theme/tokens';
import {WIDTH, HEIGHT} from '../geldakte002Data';

/**
 * Szene 2 (90–179): Die vier Karten aus Szene 1 werden magnetisch nach
 * hinten gezogen, davor erscheint das EssilorLuxottica-Wortzeichen mit
 * kurzem Lichtimpuls. Übergang übernimmt die Endposition aus Szene 1.
 */
const CENTER_X = WIDTH / 2;
const CENTER_Y = 900;

const brandSlots = [
  {name: 'RAY-BAN', x: CENTER_X - 300, y: CENTER_Y - 220},
  {name: 'OAKLEY', x: CENTER_X + 300, y: CENTER_Y - 220},
  {name: 'PRADA', x: CENTER_X - 300, y: CENTER_Y + 220},
  {name: 'CHANEL', x: CENTER_X + 300, y: CENTER_Y + 220},
];

export const EssilorReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const magnetPull = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const wordmark = spring({
    frame: frame - 10,
    fps,
    config: {damping: 12, mass: 0.6, stiffness: 160},
    durationInFrames: 20,
  });
  const wordmarkScale = interpolate(wordmark, [0, 1], [0.5, 1]);

  const lightPulse = interpolate(frame, [14, 22, 40], [0, 0.85, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: colors.dunkelblauTief}}>
      {brandSlots.map((b) => {
        const scale = interpolate(magnetPull, [0, 1], [1, 0.5]);
        const y = interpolate(magnetPull, [0, 1], [b.y, CENTER_Y]);
        const x = interpolate(magnetPull, [0, 1], [b.x, CENTER_X]);
        const opacity = interpolate(magnetPull, [0, 1], [0.95, 0.28]);

        return (
          <div
            key={b.name}
            style={{
              position: 'absolute',
              left: x - 160,
              top: y - 100,
              transform: `scale(${scale})`,
              opacity,
              filter: 'blur(1px)',
            }}
          >
            <Card title={b.name} width={320} height={200} />
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: WIDTH,
          height: HEIGHT,
          background: `radial-gradient(circle at ${CENTER_X}px ${CENTER_Y}px, rgba(251,243,226,${lightPulse}) 0%, rgba(251,243,226,0) 60%)`,
        }}
      />

      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div
          style={{
            transform: `scale(${wordmarkScale})`,
            opacity: interpolate(wordmark, [0, 1], [0, 1]),
            border: `6px solid ${colors.kupfer}`,
            borderRadius: 22,
            padding: '40px 46px',
            backgroundColor: 'rgba(16,26,46,0.75)',
            boxShadow: `0 0 ${60 * lightPulse}px ${20 * lightPulse}px rgba(214,138,58,0.5)`,
          }}
        >
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: fonts.displayWeight,
              fontSize: 76,
              letterSpacing: '0.02em',
              textAlign: 'center',
              color: colors.creme,
              lineHeight: 1.05,
            }}
          >
            ESSILOR
            <br />
            LUXOTTICA
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
