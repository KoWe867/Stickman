import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../../theme/tokens';

/**
 * Szene 9 (870–989): Ein Stapel aus fünf generischen Oakley-Bestellkarten
 * schrumpft auf eine. Keine reale Bestelldokumentation liegt vor – die
 * Karten zeigen deshalb neutrale, generische Bestellnummern statt
 * nachgebauter Firmendokumente. Keine unbelegte Prozentzahl.
 */
const cards = [
  {id: 'A-118', exitX: -900, delay: 30},
  {id: 'A-119', exitX: -900, delay: 46},
  {id: 'A-120', exitX: 900, delay: 62},
  {id: 'A-121', exitX: 900, delay: 78},
] as const;

/** Fester vertikaler Anker für den Stapel (absolut positionierte Kinder
 * ignorieren das Padding des Flex-Containers, deshalb hier direkt addiert). */
const STACK_TOP = 700;

export const OrderCards: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const stackIn = spring({frame, fps, config: {damping: 14, mass: 0.6}, durationInFrames: 18});

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.cremeHell,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {cards.map((card, i) => {
        const exit = spring({
          frame: frame - card.delay,
          fps,
          config: {damping: 13, mass: 0.6},
          durationInFrames: 20,
        });
        const x = interpolate(exit, [0, 1], [0, card.exitX]);
        const rotate = interpolate(stackIn, [0, 1], [0, (i - 1.5) * 4]);

        return (
          <div
            key={card.id}
            style={{
              position: 'absolute',
              top: STACK_TOP + 60 - i * 18,
              width: 380,
              height: 220,
              transform: `translateX(${x}px) rotate(${rotate}deg) scale(${interpolate(stackIn, [0, 1], [0.7, 1])})`,
              backgroundColor: colors.creme,
              border: `4px solid ${colors.kontur}`,
              borderRadius: 16,
              boxShadow: '0 16px 26px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: 20,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: colors.burgund,
              }}
            >
              Bestellung
            </span>
            <span
              style={{
                fontFamily: fonts.display,
                fontWeight: fonts.displayWeight,
                fontSize: 46,
                color: colors.kontur,
              }}
            >
              {card.id}
            </span>
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          top: STACK_TOP - 12,
          width: 380,
          height: 220,
          transform: `scale(${interpolate(stackIn, [0, 1], [0.7, 1])})`,
          backgroundColor: colors.creme,
          border: `6px solid ${colors.burgund}`,
          borderRadius: 16,
          boxShadow: '0 20px 34px rgba(0,0,0,0.35)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: 20,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: colors.burgund,
          }}
        >
          Bestellung
        </span>
        <span
          style={{
            fontFamily: fonts.display,
            fontWeight: fonts.displayWeight,
            fontSize: 46,
            color: colors.kontur,
          }}
        >
          A-117
        </span>
      </div>
    </AbsoluteFill>
  );
};
