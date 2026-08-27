import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts, safeZone} from '../theme/tokens';

/**
 * Vollständige Voiceover-Untertitel einer Szene, in Segmente von maximal
 * fünf Wörtern zerlegt (Caption-Regeln). Die Segmente lösen einander ruhig
 * ab statt wortweise zu animieren – Dynamik kommt aus dem Bild, nicht aus
 * der Caption (Caption-Regeln, "ruhig lesbar").
 *
 * Sitzt am unteren Bildrand, SceneLabel sitzt oben – beide überschneiden
 * sich dadurch nie.
 */
const chunk = (text: string, maxWords = 5): string[] => {
  const words = text.trim().split(/\s+/);
  const out: string[] = [];
  for (let i = 0; i < words.length; i += maxWords) {
    out.push(words.slice(i, i + maxWords).join(' '));
  }
  return out;
};

const renderSegment = (segment: string, keyword?: string) => {
  if (!keyword) return segment;
  const parts = segment.split(new RegExp(`(${keyword})`, 'i'));
  return parts.map((part, i) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={i} style={{color: colors.kupfer}}>
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
};

export const Captions: React.FC<{
  readonly text: string;
  /** Einziges Schlüsselwort dieses Satzes, das die Akzentfarbe erhält. */
  readonly keyword?: string;
  readonly durationInFrames: number;
}> = ({text, keyword, durationInFrames}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const segments = chunk(text);
  // Die letzten 15% der Szene bleiben ohne Caption-Wechsel, damit das Bild
  // kurz für sich steht, bevor der Schnitt kommt.
  const fenster = durationInFrames * 0.85;
  const proSegment = fenster / segments.length;

  const index = Math.min(
    segments.length - 1,
    Math.floor(frame / proSegment),
  );
  const segmentStart = index * proSegment;
  const localFrame = frame - segmentStart;

  const einblenden = spring({
    frame: localFrame,
    fps,
    config: {damping: 16, mass: 0.5},
    durationInFrames: 10,
  });

  const scale = interpolate(einblenden, [0, 1], [0.9, 1]);
  const opacity = interpolate(einblenden, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        left: safeZone.horizontal,
        right: safeZone.horizontal,
        bottom: safeZone.bottom,
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <span
        style={{
          fontFamily: fonts.display,
          fontWeight: fonts.displayWeight,
          fontSize: 60,
          lineHeight: 1.14,
          maxWidth: 900,
          textAlign: 'center',
          textTransform: 'uppercase',
          color: colors.creme,
          textShadow: `7px 0 0 ${colors.kontur}, -7px 0 0 ${colors.kontur}, 0 7px 0 ${colors.kontur}, 0 -7px 0 ${colors.kontur}, 5px 5px 0 ${colors.kontur}, -5px -5px 0 ${colors.kontur}, 5px -5px 0 ${colors.kontur}, -5px 5px 0 ${colors.kontur}, 0 14px 26px rgba(0,0,0,0.5)`,
          WebkitTextStroke: `1.5px ${colors.kontur}`,
        }}
      >
        {renderSegment(segments[index], keyword)}
      </span>
    </div>
  );
};
