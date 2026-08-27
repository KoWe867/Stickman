import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Betrag} from '../../../components/Betrag';
import {colors, fonts} from '../../../theme/tokens';

/**
 * Szene 10 (990–1109): sachlicher Börsenchart, Datum 02.08.2001. Linie
 * fällt von 17,49 $ auf 11,03 $. Erst am Tiefpunkt erscheint "-37 %".
 */
const CHART_LEFT = 120;
const CHART_RIGHT = 960;
const CHART_TOP = 660;
const CHART_BOTTOM = 1060;
const HIGH = 17.49;
const LOW = 11.03;

// Deterministischer, leicht unruhiger Kursverlauf (Sinus-Overlay, kein Zufall).
const points = Array.from({length: 13}, (_, i) => {
  const t = i / 12;
  const base = HIGH - (HIGH - LOW) * Math.pow(t, 1.6);
  const wobble = Math.sin(i * 1.7) * 0.28 * (1 - t);
  return {t, price: base + wobble};
});

const priceToY = (price: number) =>
  CHART_BOTTOM - ((price - LOW) / (HIGH - LOW)) * (CHART_BOTTOM - CHART_TOP);
const tToX = (t: number) => CHART_LEFT + t * (CHART_RIGHT - CHART_LEFT);

const pathD = points
  .map((p, i) => `${i === 0 ? 'M' : 'L'} ${tToX(p.t)} ${priceToY(p.price)}`)
  .join(' ');

const PATH_LENGTH = 1400;

export const StockCrash: React.FC = () => {
  const frame = useCurrentFrame();

  const draw = interpolate(frame, [0, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: colors.cremeHell}}>
      <div
        style={{
          position: 'absolute',
          top: 640,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: fonts.body,
          fontSize: 30,
          letterSpacing: '0.1em',
          color: colors.kontur,
        }}
      >
        OAKLEY INC. · 02.08.2001
      </div>

      <svg width={1080} height={1920} style={{position: 'absolute', top: 0, left: 0}}>
        <line
          x1={CHART_LEFT}
          y1={CHART_BOTTOM}
          x2={CHART_RIGHT}
          y2={CHART_BOTTOM}
          stroke={colors.kontur}
          strokeWidth={3}
        />
        <path
          d={pathD}
          fill="none"
          stroke={colors.burgund}
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={PATH_LENGTH}
          strokeDashoffset={PATH_LENGTH - PATH_LENGTH * draw}
        />
        <circle
          cx={tToX(points[points.length - 1].t)}
          cy={priceToY(points[points.length - 1].price)}
          r={12}
          fill={colors.burgund}
          opacity={draw}
        />
      </svg>

      <div
        style={{
          position: 'absolute',
          top: CHART_TOP - 50,
          left: CHART_LEFT,
          fontFamily: fonts.display,
          fontWeight: fonts.displayWeight,
          fontSize: 34,
          color: colors.dunkelblau,
        }}
      >
        17,49 $
      </div>
      <div
        style={{
          position: 'absolute',
          top: CHART_BOTTOM + 14,
          left: CHART_RIGHT - 130,
          fontFamily: fonts.display,
          fontWeight: fonts.displayWeight,
          fontSize: 34,
          color: colors.burgund,
          opacity: draw,
        }}
      >
        11,03 $
      </div>

      <Sequence from={70}>
        <Betrag text="−37 %" />
      </Sequence>
    </AbsoluteFill>
  );
};
