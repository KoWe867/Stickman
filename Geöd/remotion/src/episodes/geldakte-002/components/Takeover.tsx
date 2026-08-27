import React from 'react';
import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Betrag} from '../../../components/Betrag';
import {Card} from '../../../components/Card';
import {colors, fonts} from '../../../theme/tokens';
import {WIDTH} from '../geldakte002Data';

/**
 * Szene 11 (1110–1229): Timeline springt sichtbar von 2001 auf 2007 (harter
 * Sprung, kein fliessender Verlauf – vermeidet den Eindruck direkter
 * Kausalität). Danach fährt ein Übernahme-Panel ein: Oakley, Luxottica,
 * 2,1 Milliarden Dollar.
 */
export const Takeover: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const jump = frame >= 20;
  const gapLabel = spring({frame: frame - 8, fps, config: {damping: 14, mass: 0.5}, durationInFrames: 12});

  const oakleyIn = spring({frame: frame - 44, fps, config: {damping: 13, mass: 0.7}, durationInFrames: 20});
  const luxotticaIn = spring({frame: frame - 44, fps, config: {damping: 13, mass: 0.7}, durationInFrames: 20});

  return (
    <AbsoluteFill style={{backgroundColor: colors.dunkelblauTief}}>
      <div
        style={{
          position: 'absolute',
          top: 620,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 90,
          alignItems: 'center',
        }}
      >
        <YearMark year={2001} dim={jump} />
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 26,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: colors.kupfer,
            opacity: interpolate(gapLabel, [0, 1], [0, 1]),
            transform: jump ? 'scale(1.15)' : 'scale(1)',
          }}
        >
          6 Jahre später
        </div>
        <YearMark year={2007} dim={!jump} />
      </div>

      <div
        style={{
          position: 'absolute',
          top: 900,
          left: WIDTH / 2 - 460,
          transform: `translateX(${interpolate(oakleyIn, [0, 1], [-260, 0])}px) scale(${interpolate(oakleyIn, [0, 1], [0.7, 1])})`,
          opacity: interpolate(oakleyIn, [0, 1], [0, 1]),
        }}
      >
        <Card title="OAKLEY" width={340} height={210} accent={colors.burgund} />
      </div>

      <div
        style={{
          position: 'absolute',
          top: 900,
          left: WIDTH / 2 + 120,
          transform: `translateX(${interpolate(luxotticaIn, [0, 1], [260, 0])}px) scale(${interpolate(luxotticaIn, [0, 1], [0.7, 1])})`,
          opacity: interpolate(luxotticaIn, [0, 1], [0, 1]),
        }}
      >
        <Card title="LUXOTTICA" width={340} height={210} accent={colors.kupfer} />
      </div>

      <Sequence from={72}>
        <Betrag text="2,1 Mrd. $" />
      </Sequence>
    </AbsoluteFill>
  );
};

const YearMark: React.FC<{readonly year: number; readonly dim: boolean}> = ({year, dim}) => (
  <span
    style={{
      fontFamily: fonts.display,
      fontWeight: fonts.displayWeight,
      fontSize: 54,
      color: dim ? colors.creme : colors.kupfer,
      opacity: dim ? 0.35 : 1,
    }}
  >
    {year}
  </span>
);
