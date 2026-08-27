import React from 'react';
import {Composition} from 'remotion';
import {
  Akte001,
  INTRO_SEKUNDEN,
  OUTRO_SEKUNDEN,
} from './episodes/akte-001/Akte001';
import {akte001Shots} from './episodes/akte-001/shots';
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

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Akte001"
      component={Akte001}
      durationInFrames={akte001Frames}
      fps={format.fps}
      width={format.width}
      height={format.height}
    />
  );
};
