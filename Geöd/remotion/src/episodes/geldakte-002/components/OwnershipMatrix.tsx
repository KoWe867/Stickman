import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Card} from '../../../components/Card';
import {colors, fonts} from '../../../theme/tokens';
import {WIDTH} from '../geldakte002Data';

/**
 * Szene 3 (180–299): zweigeteilte Übersicht. Links Eigentum (Ray-Ban,
 * Oakley), rechts Lizenz (Prada, Chanel). Karten rasten nacheinander ein.
 */
const entries = [
  {name: 'RAY-BAN', column: 'eigentum', row: 0, delay: 6},
  {name: 'OAKLEY', column: 'eigentum', row: 1, delay: 26},
  {name: 'PRADA', column: 'lizenz', row: 0, delay: 46},
  {name: 'CHANEL', column: 'lizenz', row: 1, delay: 66},
] as const;

const COLUMN_X = {eigentum: WIDTH * 0.27, lizenz: WIDTH * 0.73};
const ROW_Y = [760, 1020];

export const OwnershipMatrix: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const dividerGrow = spring({frame, fps, config: {damping: 18}, durationInFrames: 20});
  const headerIn = spring({frame: frame - 4, fps, config: {damping: 16}, durationInFrames: 16});

  return (
    <AbsoluteFill style={{backgroundColor: colors.cremeHell}}>
      <div
        style={{
          position: 'absolute',
          left: WIDTH / 2 - 3,
          top: 560,
          width: 6,
          height: interpolate(dividerGrow, [0, 1], [0, 620]),
          backgroundColor: colors.kontur,
        }}
      />

      {(['eigentum', 'lizenz'] as const).map((column) => (
        <div
          key={column}
          style={{
            position: 'absolute',
            left: COLUMN_X[column] - 220,
            top: 560,
            width: 440,
            textAlign: 'center',
            opacity: interpolate(headerIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headerIn, [0, 1], [-30, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: fonts.display,
              fontWeight: fonts.displayWeight,
              fontSize: 44,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: column === 'eigentum' ? colors.dunkelblau : colors.burgund,
              borderBottom: `5px solid ${column === 'eigentum' ? colors.dunkelblau : colors.burgund}`,
              paddingBottom: 8,
            }}
          >
            {column === 'eigentum' ? 'Eigene Marken' : 'Lizenz'}
          </span>
        </div>
      ))}

      {entries.map((entry) => {
        const snap = spring({
          frame: frame - entry.delay,
          fps,
          config: {damping: 9, mass: 0.6, stiffness: 200},
          durationInFrames: 16,
        });
        const y = interpolate(snap, [0, 1], [ROW_Y[entry.row] - 260, ROW_Y[entry.row]]);
        const scale = interpolate(snap, [0, 0.7, 1], [0.7, 1.08, 1]);

        return (
          <div
            key={entry.name}
            style={{
              position: 'absolute',
              left: COLUMN_X[entry.column] - 150,
              top: y,
              transform: `scale(${scale})`,
              opacity: interpolate(snap, [0, 1], [0, 1]),
            }}
          >
            <Card
              title={entry.name}
              accent={entry.column === 'eigentum' ? colors.dunkelblau : colors.burgund}
              width={300}
              height={170}
            />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
