import React from 'react';
import {colors, fonts, safeZone} from '../theme/tokens';

/**
 * Dauerhaft sichtbarer On-Screen-Kleindruck.
 *
 * `Geldakte_Kanalmaschine.md`, Abschnitt 7 legt ihn fest; Qualitäts-Gate
 * Punkt 3 und das Faktencheck-Gate Punkt 6 verlangen, dass die Rechnung
 * sichtbar als Beispiel gekennzeichnet ist. Er liegt unterhalb der Caption
 * und damit ausserhalb der zentralen Handlung.
 */
export const Kleindruck: React.FC<{readonly text: string}> = ({text}) => (
  <div
    style={{
      position: 'absolute',
      left: safeZone.horizontal,
      right: safeZone.horizontal,
      bottom: safeZone.bottom - 96,
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <span
      style={{
        fontFamily: fonts.body,
        fontSize: 26,
        lineHeight: 1.3,
        textAlign: 'center',
        color: colors.creme,
        opacity: 0.92,
        textShadow: `0 2px 6px ${colors.kontur}, 0 0 14px rgba(0,0,0,0.75)`,
      }}
    >
      {text}
    </span>
  </div>
);
