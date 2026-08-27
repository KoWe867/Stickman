import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Card} from '../../../components/Card';
import {colors} from '../../../theme/tokens';
import {WIDTH} from '../geldakte002Data';

/**
 * Szene 8 (750–869): Sunglass Hut löst sich aus Oakleys Vertriebsnetz und
 * bewegt sich unter das Luxottica-Element. Eine klare Besitzlinie rastet
 * ein. Fortsetzung der Kartenpositionen aus Szene 7.
 */
const OAKLEY_POS = {x: WIDTH / 2, y: 700};
const LUXOTTICA_POS = {x: WIDTH / 2, y: 920};
const START_POS = {x: WIDTH / 2, y: 1100};
const END_POS = {x: WIDTH / 2, y: 1220};

export const SunglassHutAcquisition: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const luxottica = spring({frame, fps, config: {damping: 13, mass: 0.6}, durationInFrames: 16});

  const detach = spring({
    frame: frame - 26,
    fps,
    config: {damping: 12, mass: 0.7},
    durationInFrames: 30,
  });

  const dock = spring({
    frame: frame - 60,
    fps,
    config: {damping: 8, mass: 0.5, stiffness: 200},
    durationInFrames: 16,
  });

  const y = interpolate(detach, [0, 1], [START_POS.y, END_POS.y]);

  return (
    <AbsoluteFill style={{backgroundColor: colors.dunkelblauTief}}>
      <div style={{position: 'absolute', left: WIDTH / 2 - 220, top: OAKLEY_POS.y - 130}}>
        <Card title="OAKLEY" width={440} height={200} accent={colors.burgund} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: WIDTH / 2 - 220,
          top: LUXOTTICA_POS.y - 100,
          transform: `scale(${interpolate(luxottica, [0, 1], [0.7, 1])})`,
          opacity: interpolate(luxottica, [0, 1], [0, 1]),
        }}
      >
        <Card title="LUXOTTICA" width={440} height={160} accent={colors.kupfer} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: WIDTH / 2 - 3,
          top: LUXOTTICA_POS.y + 60,
          width: 6,
          height: interpolate(dock, [0, 1], [0, END_POS.y - LUXOTTICA_POS.y - 60]),
          backgroundColor: colors.gruen,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: WIDTH / 2 - 160,
          top: y - 90,
        }}
      >
        <Card
          title="SUNGLASS HUT"
          subtitle={dock > 0.5 ? 'Im Besitz von Luxottica' : 'Vertriebspartner'}
          width={320}
          height={180}
          accent={dock > 0.5 ? colors.gruen : colors.dunkelblau}
        />
      </div>
    </AbsoluteFill>
  );
};
