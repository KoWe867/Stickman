import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {AkteIntro} from '../../components/AkteIntro';
import {AkteOutro} from '../../components/AkteOutro';
import {Kleindruck} from '../../components/Kleindruck';
import {Szene} from '../../components/Szene';
import {colors} from '../../theme/tokens';
import {sekundenZuFrames, startFrames} from '../../lib/shots';
import {KLEINDRUCK, akte001Shots} from './shots';

export const EPISODE = 'akte-001';
/**
 * Gemessen aus voiceover.m4a: erste Sprechpause bei 1,489–2,209 s.
 * Der Auftakt endet auf der Pausenmitte.
 */
export const INTRO_SEKUNDEN = 1.849;
/** Schlusszeile ab 57,259 s bis zum Dateiende bei 60,167 s. */
export const OUTRO_SEKUNDEN = 2.908;

/** Tonspur der Folge, 60,16 s. */
export const VOICEOVER = `${EPISODE}/voiceover.m4a`;

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
      <Audio src={staticFile(VOICEOVER)} />

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
