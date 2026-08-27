import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../../theme/tokens';
import {WIDTH} from '../geldakte002Data';

/**
 * Szene 12 (1230–1379): POV an einer stilisierten Kasse (laut Storyboard
 * ausdrücklich "stilisiert" – kein reales Terminalfoto nötig). Drei Ebenen
 * erscheinen nacheinander, jede verbindet sich mit einer feinen Linie zum
 * EssilorLuxottica-Knoten. Die Karte wird erst danach kontaktlos aufgelegt.
 */
const NODE = {x: WIDTH / 2, y: 780};
const LAYERS = [
  {label: 'MARKE', y: 980, delay: 6},
  {label: 'GLAS', y: 1080, delay: 30},
  {label: 'VERKAUF', y: 1180, delay: 54},
] as const;
const TERMINAL = {x: WIDTH / 2, y: 1340, width: 320, height: 200};

export const CheckoutFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const nodeIn = spring({frame, fps, config: {damping: 13, mass: 0.5}, durationInFrames: 14});

  const cardTap = spring({
    frame: frame - 116,
    fps,
    config: {damping: 9, mass: 0.5, stiffness: 180},
    durationInFrames: 20,
  });
  const ring = interpolate(frame, [128, 148], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{backgroundColor: colors.dunkelblauTief, perspective: 1400}}
    >
      <svg width={WIDTH} height={1920} style={{position: 'absolute', top: 0, left: 0}}>
        {LAYERS.map((layer) => {
          const grow = interpolate(frame, [layer.delay, layer.delay + 14], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <line
              key={layer.label}
              x1={NODE.x}
              y1={NODE.y}
              x2={interpolate(grow, [0, 1], [NODE.x, WIDTH / 2 - 220])}
              y2={interpolate(grow, [0, 1], [NODE.y, layer.y])}
              stroke={colors.kupfer}
              strokeWidth={3}
              opacity={grow}
            />
          );
        })}
      </svg>

      <div
        style={{
          position: 'absolute',
          top: NODE.y - 60,
          left: NODE.x - 210,
          width: 420,
          transform: `scale(${interpolate(nodeIn, [0, 1], [0.7, 1])})`,
          opacity: interpolate(nodeIn, [0, 1], [0, 1]),
          textAlign: 'center',
          fontFamily: fonts.display,
          fontWeight: fonts.displayWeight,
          fontSize: 40,
          color: colors.creme,
          border: `4px solid ${colors.kupfer}`,
          borderRadius: 16,
          padding: '16px 10px',
          backgroundColor: 'rgba(16,26,46,0.8)',
        }}
      >
        ESSILORLUXOTTICA
      </div>

      {LAYERS.map((layer) => {
        const grow = interpolate(frame, [layer.delay, layer.delay + 14], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <div
            key={layer.label}
            style={{
              position: 'absolute',
              top: layer.y - 34,
              left: WIDTH / 2 - 220 - 130,
              width: 260,
              textAlign: 'center',
              transform: `scale(${interpolate(grow, [0, 1], [0.6, 1])})`,
              opacity: grow,
              fontFamily: fonts.display,
              fontWeight: fonts.displayWeight,
              fontSize: 34,
              color: colors.kontur,
              backgroundColor: colors.creme,
              border: `4px solid ${colors.kontur}`,
              borderRadius: 14,
              padding: '10px 0',
            }}
          >
            {layer.label}
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: TERMINAL.x - TERMINAL.width / 2,
          top: TERMINAL.y - TERMINAL.height / 2,
          width: TERMINAL.width,
          height: TERMINAL.height,
          backgroundColor: colors.kontur,
          borderRadius: 24,
          transform: 'rotateX(28deg)',
          boxShadow: '0 30px 50px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: TERMINAL.width - 40,
            height: TERMINAL.height - 60,
            backgroundColor: colors.dunkelblau,
            borderRadius: 12,
            border: `3px solid ${colors.creme}`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -10,
            left: -10,
            right: -10,
            bottom: -10,
            borderRadius: 30,
            border: `4px solid ${colors.kupfer}`,
            opacity: ring,
            transform: `scale(${interpolate(ring, [0, 1], [0.9, 1.2])})`,
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: TERMINAL.x - 110,
          top: interpolate(cardTap, [0, 1], [560, TERMINAL.y - 130]),
          width: 220,
          height: 138,
          borderRadius: 16,
          backgroundColor: colors.creme,
          border: `4px solid ${colors.kontur}`,
          boxShadow: '0 20px 30px rgba(0,0,0,0.4)',
          transform: 'rotateX(28deg)',
        }}
      />
    </AbsoluteFill>
  );
};
