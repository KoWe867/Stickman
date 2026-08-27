import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Captions} from '../../components/Captions';
import {Kleindruck} from '../../components/Kleindruck';
import {SceneLabel} from '../../components/SceneLabel';
import {colors} from '../../theme/tokens';
import {BrandGrid} from './components/BrandGrid';
import {CheckoutFlow} from './components/CheckoutFlow';
import {EssilorReveal} from './components/EssilorReveal';
import {ExplodedGlasses} from './components/ExplodedGlasses';
import {FinalLoop} from './components/FinalLoop';
import {OakleyTimeline} from './components/OakleyTimeline';
import {OrderCards} from './components/OrderCards';
import {OwnershipMatrix} from './components/OwnershipMatrix';
import {RetailNetwork} from './components/RetailNetwork';
import {StockCrash} from './components/StockCrash';
import {SunglassHutAcquisition} from './components/SunglassHutAcquisition';
import {Takeover} from './components/Takeover';
import {ValueChain} from './components/ValueChain';
import {KLEINDRUCK, type SceneId, scenes} from './geldakte002Data';

const sceneComponents: Record<SceneId, React.FC> = {
  'brand-grid': BrandGrid,
  'essilor-reveal': EssilorReveal,
  'ownership-matrix': OwnershipMatrix,
  'exploded-glasses': ExplodedGlasses,
  'retail-network': RetailNetwork,
  'value-chain': ValueChain,
  'oakley-timeline': OakleyTimeline,
  'sunglass-hut': SunglassHutAcquisition,
  'order-cards': OrderCards,
  'stock-crash': StockCrash,
  takeover: Takeover,
  'checkout-flow': CheckoutFlow,
  'final-loop': FinalLoop,
};

/**
 * GELDAKTE 002 – Die Brillen-Illusion. Hauptkomposition, orchestriert alle
 * 13 Szenen aus geldakte002Data.ts. Jede Szene ist eine eigene Sequence mit
 * eigener Bild-Komponente, dem gemeinsamen SceneLabel (oberer On-Screen-
 * Text) und den gemeinsamen Captions (unteres Voiceover, siehe
 * Captions.tsx). Kleindruck läuft durchgehend.
 *
 * WICHTIG: Es liegt keine Voiceover-Audiodatei für diese Folge vor (siehe
 * Missing-Assets-Bericht). Es wird deshalb bewusst KEIN <Audio>-Element und
 * keine Platzhalter-Tonspur eingebunden – das Timing folgt ausschliesslich
 * den festen Framewerten aus geldakte002Data.ts und muss nach Lieferung der
 * echten Aufnahme gegen diese synchronisiert werden.
 */
export const Geldakte002: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: colors.cremeHell}}>
      {scenes.map((scene) => {
        const SceneComponent = sceneComponents[scene.id];
        return (
          <Sequence
            key={scene.id}
            from={scene.from}
            durationInFrames={scene.durationInFrames}
            name={`${String(scene.nummer).padStart(2, '0')} – ${scene.label}`}
          >
            <SceneComponent />
            <SceneLabel text={scene.label} />
            <Captions
              text={scene.voiceover}
              keyword={scene.keyword}
              durationInFrames={scene.durationInFrames}
            />
          </Sequence>
        );
      })}

      <Kleindruck text={KLEINDRUCK} />
    </AbsoluteFill>
  );
};
