import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Card} from '../../../components/Card';
import {colors, fonts} from '../../../theme/tokens';
import {WIDTH} from '../geldakte002Data';

/**
 * Szene 7 (630–749): Die Produktionskette friert ein (Standbild, monochrom).
 * Eine Timeline fährt auf 2001 zurück. Oakley erscheint gross im Zentrum,
 * Sunglass Hut als Vertriebsknoten daneben.
 */
const YEARS = [2007, 2005, 2003, 2001, 1999];
const TICK_GAP = 220;
const TIMELINE_Y = 620;

export const OakleyTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const monochrome = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rewind = interpolate(frame, [10, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const timelineX = interpolate(rewind, [0, 1], [WIDTH / 2 - (YEARS.length - 1) * TICK_GAP, WIDTH / 2 - 3 * TICK_GAP]);

  const oakley = spring({frame: frame - 58, fps, config: {damping: 11, mass: 0.6}, durationInFrames: 18});
  const sunglassHut = spring({frame: frame - 78, fps, config: {damping: 14, mass: 0.6}, durationInFrames: 18});

  return (
    <AbsoluteFill style={{backgroundColor: colors.dunkelblauTief}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: colors.kontur,
          opacity: monochrome * 0.55,
        }}
      />

      <div style={{position: 'absolute', top: TIMELINE_Y, left: 0, width: WIDTH, height: 6}}>
        <div
          style={{
            position: 'absolute',
            left: timelineX - WIDTH,
            width: WIDTH * 2,
            height: 6,
            backgroundColor: colors.creme,
          }}
        />
        {YEARS.map((year, i) => {
          const x = timelineX + i * TICK_GAP;
          const active = year === 2001;
          return (
            <div
              key={year}
              style={{
                position: 'absolute',
                left: x - 40,
                top: -74,
                width: 80,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: active ? colors.kupfer : colors.creme,
                  margin: '0 auto 10px',
                }}
              />
              <span
                style={{
                  fontFamily: fonts.body,
                  fontSize: active ? 34 : 24,
                  fontWeight: active ? 700 : 400,
                  color: active ? colors.kupfer : colors.creme,
                }}
              >
                {year}
              </span>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          top: 690,
          left: WIDTH / 2 - 220,
          transform: `scale(${interpolate(oakley, [0, 1], [0.6, 1])})`,
          opacity: interpolate(oakley, [0, 1], [0, 1]),
        }}
      >
        <Card title="OAKLEY" width={440} height={260} accent={colors.burgund} />
      </div>

      <div
        style={{
          position: 'absolute',
          top: 990,
          left: WIDTH / 2 - 160,
          transform: `translateX(${interpolate(sunglassHut, [0, 1], [260, 0])}px) scale(${interpolate(sunglassHut, [0, 1], [0.7, 1])})`,
          opacity: interpolate(sunglassHut, [0, 1], [0, 1]),
        }}
      >
        <Card
          title="SUNGLASS HUT"
          subtitle="Wichtigster Vertriebspartner"
          width={320}
          height={190}
        />
      </div>
    </AbsoluteFill>
  );
};
