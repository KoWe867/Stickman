import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors, fonts, safeZone} from '../theme/tokens';

/**
 * Pflicht-Schluss laut Handbuch, Abschnitt 5:
 * „Folge der Geldakte – oder bleib die Einnahmequelle.“
 *
 * Letztes Bild zeigt das Maskottchen in die Kamera mit eindeutiger Handlung
 * (STILANALYSE, letzte Regel). Der Hintergrund verläuft zurück ins Creme des
 * ersten Frames, damit die Loop-Kante sauber schliesst.
 */
export const AkteOutro: React.FC<{
  readonly maskottchen: string | null;
  readonly episode: string;
}> = ({maskottchen, episode}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const auftritt = spring({
    frame,
    fps,
    config: {damping: 13, mass: 0.6},
    durationInFrames: 14,
  });

  const scale = interpolate(auftritt, [0, 1], [0.88, 1]);
  const textAuftritt = spring({
    frame: frame - 8,
    fps,
    config: {damping: 15, mass: 0.5},
    durationInFrames: 14,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.dunkelblauTief,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AbsoluteFill style={{transform: `scale(${scale})`}}>
        {maskottchen === null ? (
          <AbsoluteFill
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.dunkelblau,
            }}
          >
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 40,
                color: colors.signalOrange,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                textAlign: 'center',
                paddingInline: 90,
              }}
            >
              Maskottchen fehlt –
              <br />
              Tresorkopf zeigt in die Kamera
            </div>
          </AbsoluteFill>
        ) : (
          <Img
            src={staticFile(`${episode}/${maskottchen}`)}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        )}
      </AbsoluteFill>

      <div
        style={{
          position: 'absolute',
          left: safeZone.horizontal,
          right: safeZone.horizontal,
          bottom: safeZone.bottom,
          display: 'flex',
          justifyContent: 'center',
          opacity: interpolate(textAuftritt, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(textAuftritt, [0, 1], [40, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: fonts.display,
            fontWeight: fonts.displayWeight,
            fontSize: 62,
            lineHeight: 1.12,
            textAlign: 'center',
            textTransform: 'uppercase',
            color: colors.creme,
            textShadow: `10px 0 0 ${colors.kontur}, -10px 0 0 ${colors.kontur}, 0 10px 0 ${colors.kontur}, 0 -10px 0 ${colors.kontur}, 8px 8px 0 ${colors.kontur}, -8px -8px 0 ${colors.kontur}, 8px -8px 0 ${colors.kontur}, -8px 8px 0 ${colors.kontur}, 0 18px 34px rgba(0,0,0,0.55)`,
            WebkitTextStroke: `2px ${colors.kontur}`,
          }}
        >
          Folge der Geldakte –<br />
          oder bleib die Einnahmequelle
        </span>
      </div>
    </AbsoluteFill>
  );
};
