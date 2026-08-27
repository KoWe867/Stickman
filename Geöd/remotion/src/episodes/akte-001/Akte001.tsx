import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {AkteIntro} from '../../components/AkteIntro';
import {AkteOutro} from '../../components/AkteOutro';
import {Kleindruck} from '../../components/Kleindruck';
import {Szene} from '../../components/Szene';
import {colors} from '../../theme/tokens';
import {sekundenZuFrames, startFrames} from '../../lib/shots';
import {KLEINDRUCK, akte001Shots} from './shots';

export const EPISODE = 'akte-001';
/** Sprechdauer von „Geldwege, die sich verboten anfuehlen. Akte 001.“ */
export const INTRO_SEKUNDEN = 2.5;
/** Sprechdauer von „Folge der Geldakte – oder bleib die Einnahmequelle.“ */
export const OUTRO_SEKUNDEN = 3.5;

/** Maskottchen-Bild für die Schlusskarte, sobald es in public/ liegt. */
const MASKOTTCHEN: string | null = null;

export const Akte001: React.FC = () => {
  const introFrames = sekundenZuFrames(INTRO_SEKUNDEN);
  const starts = startFrames(akte001Shots);
  const shotsGesamt = akte001Shots.reduce(
    (summe, shot) => summe + sekundenZuFrames(shot.sekunden),
    0,
  );

  return (
    <AbsoluteFill style={{backgroundColor: colors.cremeHell}}>
      <Sequence durationInFrames={introFrames} name="Auftakt">
        <AkteIntro nummer="001" />
      </Sequence>

      {akte001Shots.map((shot, index) => (
        <Sequence
          key={shot.id}
          from={introFrames + starts[index]}
          durationInFrames={sekundenZuFrames(shot.sekunden)}
          name={`Shot ${shot.id} – ${shot.caption || shot.beschreibung.slice(0, 24)}`}
        >
          <Szene shot={shot} episode={EPISODE} />
        </Sequence>
      ))}

      <Sequence
        from={introFrames + shotsGesamt}
        durationInFrames={sekundenZuFrames(OUTRO_SEKUNDEN)}
        name="Abbinder"
      >
        <AkteOutro maskottchen={MASKOTTCHEN} episode={EPISODE} />
      </Sequence>

      {/* Läuft über die gesamte Folge, ausser über dem Auftaktstempel. */}
      <Sequence from={introFrames} name="Kleindruck">
        <Kleindruck text={KLEINDRUCK} />
      </Sequence>
    </AbsoluteFill>
  );
};
