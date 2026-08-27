import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Betrag} from '../../../components/Betrag';
import {colors} from '../../../theme/tokens';

/**
 * Szene 5 (390–509): Ein Brillenglas vergrössert sich kreisförmig und
 * verwandelt sich per Match-Cut in einen stilisierten Globus (Gitterlinien,
 * kein reales Kartenbild nötig). 24 repräsentative Pins, deterministic über
 * den Goldenen Winkel verteilt – keine Zufallswerte. Vordergrund zählt
 * kontrolliert auf 18.000 hoch.
 */
const PIN_COUNT = 24;
const GOLDEN_ANGLE = 137.508;

const pins = Array.from({length: PIN_COUNT}, (_, i) => {
  const theta = (i * GOLDEN_ANGLE) % 360;
  // deterministische Pseudo-Breite über einen Kosinus-Sweep, kein Zufall.
  const lat = Math.cos((i / PIN_COUNT) * Math.PI * 2.4) * 70;
  return {theta, lat};
});

export const RetailNetwork: React.FC = () => {
  const frame = useCurrentFrame();

  const matchCut = interpolate(frame, [0, 22], [0.18, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const globeSize = interpolate(matchCut, [0, 1], [120, 620]);
  const rotate = interpolate(frame, [0, 119], [0, 46]);

  const pinsIn = interpolate(frame, [24, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.dunkelblauTief,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 360,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: globeSize,
          height: globeSize,
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 30%, ${colors.creme}, ${colors.kupfer} 70%, ${colors.burgund} 100%)`,
          boxShadow: '0 40px 80px rgba(0,0,0,0.55), inset -40px -40px 80px rgba(0,0,0,0.35)',
          transform: `rotate(${rotate}deg)`,
        }}
      >
        {Array.from({length: 6}).map((_, i) => (
          <div
            key={`meridian-${i}`}
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              width: globeSize * (0.15 + i * 0.16),
              height: '100%',
              marginLeft: -(globeSize * (0.15 + i * 0.16)) / 2,
              border: `2px solid rgba(21,25,26,0.35)`,
              borderRadius: '50%',
            }}
          />
        ))}

        {pins.map((pin, i) => {
          const x = 50 + 44 * Math.cos((pin.theta * Math.PI) / 180) * Math.cos((pin.lat * Math.PI) / 180 / 2);
          const y = 50 + 44 * Math.sin((pin.lat * Math.PI) / 180 / 2) - 4 * Math.sin((pin.theta * Math.PI) / 180);
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: colors.burgundHell,
                border: `2px solid ${colors.kontur}`,
                opacity: pinsIn,
                transform: `scale(${interpolate(pinsIn, [0, 1], [0, 1])})`,
              }}
            />
          );
        })}
      </div>

      <Sequence from={30}>
        <StoreCounter />
      </Sequence>
    </AbsoluteFill>
  );
};

/** Zählt kontrolliert von 0 auf 18.000 hoch, lokale Frames ab Einblendung. */
const StoreCounter: React.FC = () => {
  const localFrame = useCurrentFrame();
  const count = Math.round(
    interpolate(localFrame, [0, 70], [0, 18000], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  return <Betrag text={count.toLocaleString('de-DE')} />;
};
