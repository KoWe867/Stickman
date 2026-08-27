import React from 'react';
import {Composition} from 'remotion';
import {
  Akte001,
  INTRO_SEKUNDEN,
  OUTRO_SEKUNDEN,
} from './episodes/akte-001/Akte001';
import {akte001Shots} from './episodes/akte-001/shots';
import {Geldakte002} from './episodes/geldakte-002/Geldakte002';
import {
  TOTAL_FRAMES as geldakte002Frames,
  pruefeSzenen,
} from './episodes/geldakte-002/geldakte002Data';
import {gesamtFrames, pruefeShots, sekundenZuFrames} from './lib/shots';
import {format} from './theme/tokens';

const akte001Frames =
  sekundenZuFrames(INTRO_SEKUNDEN) +
  gesamtFrames(akte001Shots) +
  sekundenZuFrames(OUTRO_SEKUNDEN);

// Regelverstösse früh sichtbar machen, statt sie erst in der QA zu finden.
for (const befund of pruefeShots(akte001Shots)) {
  // eslint-disable-next-line no-console
  console.warn(`[GELDAKTE] ${befund}`);
}
for (const befund of pruefeSzenen()) {
  // eslint-disable-next-line no-console
  console.warn(`[GELDAKTE 002] ${befund}`);
}

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Akte001"
        component={Akte001}
        durationInFrames={akte001Frames}
        fps={format.fps}
        width={format.width}
        height={format.height}
      />
      <Composition
        id="Geldakte002"
        component={Geldakte002}
        durationInFrames={geldakte002Frames}
        fps={format.fps}
        width={format.width}
        height={format.height}
      />
    </>
  );
};
