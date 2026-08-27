import React from 'react';
import {colors, fonts} from '../theme/tokens';

/**
 * Typografische Markenkarte: Markenname als Text im Haus-Schriftschnitt,
 * bewusst KEIN nachgebautes Logo. Wird für Ray-Ban, Oakley, Prada, Chanel
 * und EssilorLuxottica verwendet, solange keine lizenzierten Markenbilder
 * im Asset-Ledger liegen (siehe Missing-Assets-Bericht).
 */
export const Card: React.FC<{
  readonly title: string;
  readonly subtitle?: string;
  readonly accent?: string;
  readonly width?: number;
  readonly height?: number;
  readonly style?: React.CSSProperties;
}> = ({title, subtitle, accent = colors.dunkelblau, width = 320, height = 200, style}) => (
  <div
    style={{
      width,
      height,
      borderRadius: 20,
      backgroundColor: colors.cremeHell,
      border: `6px solid ${colors.kontur}`,
      borderTop: `10px solid ${accent}`,
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      padding: 16,
      ...style,
    }}
  >
    <div
      style={{
        fontFamily: fonts.display,
        fontWeight: fonts.displayWeight,
        fontSize: width < 260 ? 34 : 42,
        lineHeight: 1.05,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: colors.kontur,
      }}
    >
      {title}
    </div>
    {subtitle ? (
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 22,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          textAlign: 'center',
          color: accent,
        }}
      >
        {subtitle}
      </div>
    ) : null}
  </div>
);
